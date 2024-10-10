import React, { useEffect, useState } from 'react';
import { View, Button, Text, StyleSheet, FlatList } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import axios from 'axios';

// Important: Add your Client ID here
const CLIENT_ID = '322586237838-65tjpbsqcrd5c7ddn99f94qcdcjoauf8.apps.googleusercontent.com';

WebBrowser.maybeCompleteAuthSession();

const GmailAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: CLIENT_ID,
    scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
    redirectUri: 'http://localhost:8081', // Update if needed
  });

  const [emails, setEmails] = useState([]);
  const [token, setToken] = useState(null);

  // Handle response from Google sign-in
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setToken(authentication.accessToken); // Save access token
      fetchEmails(authentication.accessToken); // Fetch emails once authenticated
    }
  }, [response]);

  // Fetch user's emails from Gmail API
  const fetchEmails = async (accessToken) => {
    try {
      const res = await axios.get(
        'https://www.googleapis.com/gmail/v1/users/me/messages',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      // Fetch the first 10 emails (you can change the limit)
      const messagePromises = res.data.messages.slice(0, 10).map(async (message) => {
        const details = await axios.get(
          `https://www.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return details.data.snippet; // Get email snippet (summary of the email)
      });

      const emailData = await Promise.all(messagePromises);
      setEmails(emailData); // Save fetched emails in state
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  return (
    <View style={styles.container}>
      {!token ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (
        <View>
          <Text style={styles.header}>Inbox Emails</Text>
          <FlatList
            data={emails}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.emailText}>{item}</Text>}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
});

export default GmailAuth;
