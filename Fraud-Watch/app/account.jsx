import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Account = ({ onNavigateBack, userData }) => {
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
