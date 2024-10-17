import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, ScrollView, Platform, Alert as RNAlert } from 'react-native';
import { WebView } from 'react-native-webview';
import { FontAwesome } from "@expo/vector-icons"; // For back arrow and copy icon
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation

const Button = ({ onPress, children }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

const fetchScamDataFromAPI = async (location) => {
  try {
    const apiKey = 'fddde03e72a447b9943703b1d946a6d6';
    const query = `scam OR fraud OR "identity theft" location:${encodeURIComponent(location)}`;
    const response = await fetch(`https://newsapi.org/v2/everything?q=${encodeURIComponent('scam fraud')}+${encodeURIComponent(location)}&apiKey=${apiKey}`);
    const data = await response.json();
    if (data.articles.length === 0) {
      console.log('No scam data found for this location.');
      return [];
    }
    return data.articles.map(article => ({
      title: article.title,
      type: extractScamType(article.description), // Infer scam type from description
      area: location, // Use the searched location
      url: article.url,
      source: article.source.name
    }));
  } catch (error) {
    console.error('Error fetching scam data from API:', error);
    return [];
  }
};

// Example utility function to extract scam type from an article description or title
const extractScamType = (text) => {
    if (/phishing/i.test(text)) return "Phishing";
    if (/identity theft/i.test(text)) return "Identity Theft";
    if (/Online Banking Frauds/i.test(text)) return "Online Banking F"
    if (/Credit Card Frauds/i.test(text)) return "Credit Card F";
    if (/ATM Card Skimming/i.test(text)) return "ATM Card Skimming";
    if (/Tech Support Scams/i.test(text)) return "Tech Support Scams";
    if (/Credit Card Dealing/i.test(text)) return "Credit Card Dealing";
    if (/Bank Account Hijacking/i.test(text)) return "Bank Account Hijacking";
    if (/Cybercrime/i.test(text)) return "Cybercrime";
    if (/Skimming/i.test(text)) return "Skimming";
    if (/fraud/i.test(text)) return "Fraud";
    return "General Scam";
  };

export default function ScamAlert({ onNavigateBack }) {
  const [location, setLocation] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: -36.8485, lng: 174.7633 }); // Default to Auckland
  const [mapHTML, setMapHTML] = useState('');
  const [scamArticles, setScamArticles] = useState([]);
  const navigation = useNavigation(); // Initialize navigation hook

  useEffect(() => {
    generateMapHTML(mapCenter);
  }, [mapCenter]);

  const searchLocation = async () => {
    if (location.trim() === '') {
      RNAlert.alert('Please enter a location');
      return;
    }
    try {
      const geoResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyCrQM9oQesIyMTQEsN6S3kfiqd3biWIw3w`);
      const geoData = await geoResponse.json();
      if (geoData.results.length > 0) {
        const { lat, lng } = geoData.results[0].geometry.location;
        setMapCenter({ lat, lng });
        const articles = await fetchScamDataFromAPI(location);
        setScamArticles(articles);
      } else {
        RNAlert.alert('Location not found');
      }
    } catch (error) {
      RNAlert.alert('Error fetching location data');
      console.error('Error:', error);
    }
  };

  const generateMapHTML = (center) => {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          #map { height: 100%; width: 100%; }
          html, body { height: 100%; margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <div id='map'></div>
        <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyCrQM9oQesIyMTQEsN6S3kfiqd3biWIw3w&callback=initMap' async defer></script>
        <script>
          function initMap() {
            var center = { lat: ${center.lat}, lng: ${center.lng} };
            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 12,
              center: center
            });
          }
        </script>
      </body>
      </html>
    `;
    setMapHTML(html);
  };

  return (
    <View style={styles.container}>
        {/* Header Section */}
      <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
          <FontAwesome name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Location Check</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
        />
        <Button onPress={searchLocation}>Search</Button>
      </View>
      {Platform.OS === 'web' ? (
        <View style={styles.mapContainer}>
          <iframe srcDoc={mapHTML} style={{ width: '100%', height: '100%' }} frameBorder="0"></iframe>
        </View>
      ) : (
        <WebView
          style={styles.mapContainer}
          originWhitelist={['*']}
          source={{ html: mapHTML }}
          accessibilityLabel="Map showing reported scams"
        />
      )}
      <ScrollView style={styles.scamBubbleContainer}>
        {scamArticles.map((article, index) => (
          <View key={index} style={styles.scamBubble}>
            <Text style={styles.bubbleTitle}>Title: {article.title}</Text>
            <Text style={styles.bubbleText}>Scam Type: {article.type}</Text>
            <Text style={styles.bubbleText}>Area: {article.area}</Text>
          </View>
          
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row', // Set children to be in a row
    alignItems: 'center', // Align items in the center vertically
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mapContainer: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  scamBubbleContainer: {
    padding: 10,
  },
  scamBubble: {
    backgroundColor: '#ff74d3',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    width: 300, // Fixed width for all bubbles
    alignSelf: 'center',
  },
  bubbleTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
    
  },
  bubbleText: {
    fontSize: 14,
    marginBottom: 2,
    flexShrink: 1
  },
});

