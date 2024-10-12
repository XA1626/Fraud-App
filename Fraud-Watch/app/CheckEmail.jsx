import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CheckEmail = ({ onNavigateBack }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [breaches, setBreaches] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckEmail = async () => {
    setError(''); // Clears the error and sets it to nothing
    setBreaches([]); // Reset breaches array
    setIsChecked(false);

    // Check if email input contains "@" and return an error if not.
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      // Send a request to your backend Express server to check for breaches.
      const response = await fetch(`http://localhost:5000/api/check-email?email=${encodeURIComponent(email)}`);

      // Check the response status
      if (response.ok) {
        const data = await response.json();
        setBreaches(data); // Set breaches if found
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to check email. Please try again.'); // Show an error if something went wrong
      }
    } catch (err) {
      console.error('Error checking email:', err); // Log error for debugging
      setError('Failed to check email. Please try again.');
    } finally {
      setIsChecked(true); // Mark as checked after the API call is finished
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={onNavigateBack} />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Check if Pwned" onPress={handleCheckEmail} />
      
      {isChecked && breaches.length > 0 && (
        <View style={styles.breachContainer}>
          <Text style={styles.title}>Breaches for {email}:</Text>
          {breaches.map((breach) => (
            <View key={breach.Name} style={styles.breachItem}>
              <Text style={styles.boldText}>Website: {breach.Domain}</Text>
              <Text style={styles.boldText}>Date Pwned: {breach.BreachDate}</Text>
              <Text style={styles.boldText}>Compromised Data: {breach.DataClasses.join(', ')}</Text>
              <Text>{breach.Description}</Text>
            </View>
          ))}
        </View>
      )}

      {isChecked && breaches.length === 0 && (
        <Text>No breaches found for this email.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  error: {
    color: 'red',
  },
  breachContainer: {
    marginTop: 20,
  },
  breachItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default CheckEmail;
