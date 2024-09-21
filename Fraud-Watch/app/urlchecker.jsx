import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

// Replace with your Google Safe Browsing API Key
const googleApiKey = 'AIzaSyA9qRDwAfZqca4L1imLL8A3yeLdQBEdMOY';

const UrlChecker = ({ onNavigateBack }) => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const normalizeUrl = (url) => {
    try {
      const parsedUrl = new URL(url);
      parsedUrl.protocol = parsedUrl.protocol ? parsedUrl.protocol : 'http:';
      let normalizedPath = parsedUrl.pathname.replace(/\/{2,}/g, '/');
      if (normalizedPath === '/' || normalizedPath === '') {
        normalizedPath = '/';
      }
      parsedUrl.pathname = normalizedPath;
      return parsedUrl.href;
    } catch (error) {
      console.error('URL normalization error:', error);
      return null;
    }
  };

  const checkUrl = async () => {
    const normalizedUrl = normalizeUrl(url);
    if (!normalizedUrl) {
      setResult('Invalid URL. Please enter a valid URL.');
      return;
    }

    setLoading(true);
    setResult(null); // Clear previous results
    setTimeout(async () => {
      try {
        const response = await axios.post(
          `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${googleApiKey}`,
          {
            client: {
              clientId: "your-client-id",
              clientVersion: "1.0",
            },
            threatInfo: {
              threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
              platformTypes: ["ANY_PLATFORM"],
              threatEntryTypes: ["URL"],
              threatEntries: [{ url: normalizedUrl }],
            },
          }
        );

        const data = response.data;
        const isPhishingGoogle = data.matches && data.matches.length > 0;
        let message = isPhishingGoogle ? 'This URL is potentially dangerous.' : 'This URL is safe.';

        setResult(message);
      } catch (error) {
        console.error('Error checking URL:', error.response ? error.response.data : error.message);
        setResult('Error checking the URL. Please try again later.');
      } finally {
        setLoading(false);
      }
    }, 2000); // Simulate a 2-second loading time
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Image */}
      <Image source={require('../assets/link.png')} style={styles.image} />

      {/* Title and Instructions */}
      <Text style={styles.title}>Link Checker</Text>
      <Text style={styles.subtitle}>Is this link safe?</Text>
      
      {/* Description with smaller font and adjusted width for 2-line text */}
      <Text style={styles.description}>
        Submit a URL you want to visit to detect malware, fake websites, and phishing attacks.
      </Text>

      {/* URL Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your URL here"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {/* Gradient Analyze Button */}
      <LinearGradient
        colors={['#7130f1', '#e66f26']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.analyzeButton}
      >
        <TouchableOpacity onPress={checkUrl}>
          <Text style={styles.analyzeButtonText}>Analyze</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Loading and Result in the box */}
      <View style={styles.resultBox}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          result && <Text style={styles.resultText}>{result}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 150,
    padding: 10,
  },
  backButtonText: {
    fontSize: 30,
    color: '#000',
  },
  image: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    width: '50%',
    alignSelf: 'center',
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 8,
    marginBottom: 15,
    fontSize: 14,
    width: 250,  // Fixed width for input
    alignSelf: 'center',  // Center the input field
  },
  analyzeButton: {
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10, // Moved closer to result box
    width: 200,  // Smaller button width to make it more app-like
    alignSelf: 'center',  // Center the button
  },
  analyzeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginTop: 10, // Moved closer to the Analyze button
    width: 250,  // Match the width of the input field
    height: 130,  // Increased height for the result box
    alignSelf: 'center',
    justifyContent: 'flex-start',  // Align text to top-left
    // Added shadow for a better design
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,  // Shadow for Android
  },
  resultText: {
    fontSize: 12,  // Smaller font size
    color: 'blue',
    textAlign: 'left',  // Align text to top-left
  },
});

export default UrlChecker;
