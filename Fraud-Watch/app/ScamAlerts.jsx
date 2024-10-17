import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert as RNAlert,
  FlatList,
  Platform,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { FontAwesome } from "@expo/vector-icons"; // For back arrow and copy icon
import { useNavigation } from '@react-navigation/native'; // Importing useNavigation

// Custom Button Component
const Button = ({ onPress, children, disabled }) => (
  <TouchableOpacity
    style={[styles.button, disabled && styles.buttonDisabled]}
    onPress={onPress}
    disabled={disabled}
    accessibilityRole="button"
    accessibilityLabel={children}
  >
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

// Utility function to extract scam type from text
const extractScamType = (text) => {
  if (/phishing/i.test(text)) return "Phishing";
  if (/identity theft/i.test(text)) return "Identity Theft";
  if (/online banking frauds/i.test(text)) return "Online Banking Frauds";
  if (/credit card frauds/i.test(text)) return "Credit Card Frauds";
  if (/atm card skimming/i.test(text)) return "ATM Card Skimming";
  if (/tech support scams/i.test(text)) return "Tech Support Scams";
  if (/credit card dealing/i.test(text)) return "Credit Card Dealing";
  if (/bank account hijacking/i.test(text)) return "Bank Account Hijacking";
  if (/cybercrime/i.test(text)) return "Cybercrime";
  if (/skimming/i.test(text)) return "Skimming";
  if (/fraud/i.test(text)) return "Fraud";
  return "General Scam";
};

// Function to fetch scam data from NewsAPI
const fetchScamDataFromAPI = async (location) => {
  try {
    const apiKey = 'fddde03e72a447b9943703b1d946a6d6'; // Replace with your NewsAPI key
    const query = `scam OR fraud OR "identity theft" location:${encodeURIComponent(location)}`;
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent('scam fraud')}+${encodeURIComponent(location)}&apiKey=${apiKey}`
    );
    const data = await response.json();
    if (data.articles.length === 0) {
      console.log('No scam data found for this location.');
      return [];
    }
    return data.articles.map(article => ({
      title: article.title,
      type: extractScamType(article.description || article.title || ''),
      area: location,
      url: article.url,
      source: article.source.name
    }));
  } catch (error) {
    console.error('Error fetching scam data from API:', error);
    return [];
  }
};

export default function ScamAlert({ onNavigateBack }) {
  const [location, setLocation] = useState('');
  const [mapCenter, setMapCenter] = useState({ lat: -36.8485, lng: 174.7633 }); // Default to Auckland
  const [mapHTML, setMapHTML] = useState('');
  const [scamArticles, setScamArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigation = useNavigation(); // Initialize navigation hook

  // Effect to generate map HTML when map center changes
  useEffect(() => {
    generateMapHTML(mapCenter);
  }, [mapCenter]);

  // Function to handle location search
  const searchLocation = async () => {
    if (location.trim() === '') {
      RNAlert.alert('Input Required', 'Please enter a location.');
      return;
    }
    setLoading(true);
    setSearchPerformed(true);
    try {
      // Fetch geocoding data from Google Maps Geocoding API
      const geoResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=AIzaSyCrQM9oQesIyMTQEsN6S3kfiqd3biWIw3w`); // Replace with your Google Maps Geocoding API key
      const geoData = await geoResponse.json();
      if (geoData.results.length > 0) {
        const { lat, lng } = geoData.results[0].geometry.location;
        setMapCenter({ lat, lng });
        // Fetch scam articles
        const articles = await fetchScamDataFromAPI(location);
        setScamArticles(articles);
      } else {
        RNAlert.alert('Location Not Found', 'Please enter a valid location.');
        setScamArticles([]); // Clear previous articles
      }
    } catch (error) {
      RNAlert.alert('Error', 'There was an error fetching location data.');
      console.error('Error:', error);
      setScamArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to generate HTML for Google Maps
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
            var marker = new google.maps.Marker({
              position: center,
              map: map
            });
          }
        </script>
      </body>
      </html>
    `;
    setMapHTML(html);
  };

  // Render function for FlatList items
  const renderScamItem = ({ item }) => (
    <View style={styles.scamBubble}>
      <Text style={styles.bubbleTitle}>Title: {item.title}</Text>
      <Text style={styles.bubbleText}>Scam Type: {item.type}</Text>
      <Text style={styles.bubbleText}>Area: {item.area}</Text>
      <TouchableOpacity onPress={() => RNAlert.alert('Source', item.source)}>
        <Text style={styles.sourceText}>Source: {item.source}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
      
        <TouchableOpacity
          style={styles.backButton}
          onPress={onNavigateBack}
          accessibilityRole="button"
          accessibilityLabel="Go Back"
        >
          <FontAwesome name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Location Check</Text>
      </View>

      {/* Alert Box for Number of Scams */}
      {!loading && searchPerformed && (
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>
            {scamArticles.length > 0
              ? `Found ${scamArticles.length} scam(s) reported in ${location}.`
              : `No scams reported in ${location}.`}
          </Text>
        </View>
      )}

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 20 }} />
      )}

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
          accessibilityLabel="Location Input"
          accessibilityHint="Enter a location to search for scam reports"
        />
        <Button onPress={searchLocation} disabled={location.trim() === ''}>
          Search
        </Button>
      </View>

      {/* Map Section */}
      {Platform.OS === 'web' ? (
        <View style={styles.mapContainer}>
          <iframe
            srcDoc={mapHTML}
            style={{ width: '100%', height: '100%' }}
            frameBorder="0"
            title="Map"
          ></iframe>
        </View>
      ) : (
        <WebView
          style={styles.mapContainer}
          originWhitelist={['*']}
          source={{ html: mapHTML }}
          accessibilityLabel="Map showing reported scams"
        />
      )}

      {/* Scam Articles List */}
      <FlatList
        style={styles.scamBubbleContainer}
        data={scamArticles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderScamItem}
        ListEmptyComponent={
          !loading && searchPerformed && (
            <Text style={styles.noDataText}>No scam reports to display.</Text>
          )
        }
        contentContainerStyle={scamArticles.length === 0 && styles.emptyList}
      />
    </View>
  );
}

// Get device width for responsive design
//const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row', // Set children to be in a row
    alignItems: 'center', // Align items in the center vertically
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  alertBox: {
    backgroundColor: '#fff4e5',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#ffa500',
  },
  alertText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: '#a0c4ff',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mapContainer: {
    width: '100%',
    height: '50%',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  scamBubbleContainer: {
    padding: 10,
    flex: 1,
  },
  scamBubble: {
    backgroundColor: '#ffebf0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3, // For Android shadow
    width: '20%', // Responsive width
    alignSelf: 'center',
  },
  bubbleTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  bubbleText: {
    fontSize: 14,
    marginBottom: 3,
    color: '#555',
  },
  sourceText: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  noDataText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    backgroundColor: '#fff4e5',
    padding: 8, // Reduced padding
    marginHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 4, // Slightly thicker border for visibility
    borderLeftColor: '#ffa500',
    width: '20%'// Responsive width
  },
  alertText: {
    color: '#333',
    fontSize: 14, // Reduced font size
    textAlign: 'center'
  }
});

