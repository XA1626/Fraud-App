// Account.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchUserProfile } from './firebase'; // Assuming this function fetches user data from Firebase

const Account = ({ onNavigateBack }) => {
  const [userData, setUserData] = useState(null); // To hold user data
  const [loading, setLoading] = useState(true); // To show a loading indicator

  useEffect(() => {
    // Fetch user data from Firebase
    const getUserData = async () => {
      try {
        const data = await fetchUserProfile(); // Assuming fetchUserProfile fetches user data
        setUserData(data); // Set the fetched data
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };

    getUserData(); // Call the function to fetch data
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Details</Text>
      <Text style={styles.info}>Username: {userData?.username || 'N/A'}</Text>
      <Text style={styles.info}>Email: {userData?.email || 'N/A'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Account;
