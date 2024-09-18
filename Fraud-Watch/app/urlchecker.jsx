import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

// Replace with your Google Safe Browsing API Key
const googleApiKey = 'AIzaSyA9qRDwAfZqca4L1imLL8A3yeLdQBEdMOY';

const UrlChecker = () => {
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

  const isSuspiciousUrl = (url) => {
    const suspiciousPatterns = [
      /-/,          // Hyphen in the domain
      /login/,      // URLs containing 'login'
      /verify/,     // URLs containing 'verify'
      /\.ru$/,      // Domains ending in .ru (commonly used by attackers)
      /\.xyz$/,     // Domains ending in .xyz (often associated with spam)
    ];

    return suspiciousPatterns.some((pattern) => pattern.test(url));
  };

  const checkUrl = async () => {
    const normalizedUrl = normalizeUrl(url);
    if (!normalizedUrl) {
      Alert.alert('Invalid URL', 'Please enter a valid URL.');
      return;
    }

    setLoading(true);

    try {
      console.log('Normalized URL:', normalizedUrl);

      // First, check with Google Safe Browsing
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

      console.log('Response from Google Safe Browsing:', response.data);

      const data = response.data;
      const isPhishingGoogle = data.matches && data.matches.length > 0;
      const isSuspicious = isSuspiciousUrl(normalizedUrl);

      const isPhishing = isPhishingGoogle || isSuspicious;

      let message = isPhishing ? 'This URL is potentially dangerous.' : 'This URL is safe.';

      setResult({
        isPhishing,
        message: message,
        details: data,
      });
    } catch (error) {
      console.error('Error checking URL with Google Safe Browsing:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Unable to check the URL. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check URL for Phishing</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter URL"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title={loading ? "Checking..." : "Check URL"} onPress={checkUrl} disabled={loading} />
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {result.message}
          </Text>
          {result.isPhishing && (
            <Text style={styles.detailsText}>Details: {JSON.stringify(result.details, null, 2)}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    width: '100%',
  },
  resultContainer: {
    marginTop: 16,
  },
  resultText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  detailsText: {
    marginTop: 8,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});

export default UrlChecker;