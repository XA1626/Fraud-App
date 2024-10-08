import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CheckEmail = ({ onNavigateBack }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [breaches, setBreaches] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckEmail = async () => {
    setError(''); // clears the error and sets it to nothing
    setBreaches([]);
    setIsChecked(false);
    
    // checks email input if the @ was passed through, if not then return the error to enter valid email.
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try { 
      // tries to fetch the API using the API key
      const response = await fetch(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'hibp-api-key': 'TBA_API_KEY', 
            'user-agent': 'FraudWatchApp', //  
          },
        }
      );

      // error case checking to see the response status. If 200, process the data, if 404, no breaches found, else handle the error.
      if (response.status === 200) {
        const data = await response.json();
        setBreaches(data);
      } else if (response.status === 404) {
        setBreaches([]); // no breaches found for the given email!
      } else {
        throw new Error('Unable to fetch breach data');
      }
    } catch (err) {
      setError('Failed to check email. Please try again.');
    } finally {
      setIsChecked(true); // ensure the API was called and results are now ready to display
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

      {/* show any breaches if found to ensure good data passing */}
      {isChecked && breaches.length > 0 && (
        <View style={styles.breachContainer}>
          <Text style={styles.title}>Breaches for {email}:</Text>
          {breaches.map((breach) => (
            <View key={breach.Name} style={styles.breachItem}>
              <Text style={styles.boldText}>Website: {breach.Domain}</Text>
              <Text style={styles.boldText}>Date Pwned: {breach.BreachDate}</Text>
              <Text>{breach.Description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* display "No breaches found" only after checking */}
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
