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
    
    // Checks email input to see if the @ was passed through, if not, then return an error asking for a valid email.
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try { 
      console.log('Checking email:', email); // Debug log for checking email
      
      // Tries to fetch using the API key
      const response = await fetch(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
        {
          method: 'GET',
          headers: {
            'hibp-api-key': 'aa97b5b07a314a0dba9a838c8b1eac90', // Api Key
            'user-agent': 'FraudWatchApp', // Required to specify a user agent
          },
        }
      );

      console.log('Response status:', response.status); // Log the response status

      // Error case checking based on the response status.
      if (response.status === 200) {
        const data = await response.json();
        console.log('Breach data:', data); // Debug log to check the data returned
        setBreaches(data); // Set breaches if data is returned successfully
      } else if (response.status === 404) {
        // No breaches found for the given email
        console.log('No breaches found'); // Debug log for no breaches
        setBreaches([]); 
      } else if (response.status === 401) {
        // Unauthorized, invalid API key
        setError('Unauthorized. Please check your API key.');
      } else if (response.status === 403) {
        // Forbidden, likely due to missing or invalid user agent
        setError('Forbidden. The request was blocked due to a missing or invalid user agent.');
      } else if (response.status === 429) {
        // Rate limit exceeded
        setError('Too many requests. Please wait before trying again.');
      } else {
        // Handle any other unexpected status codes
        console.log('Unexpected response:', response.status); // Debug log for unexpected status
        setError('Unable to fetch breach data. Please try again later.');
      }
    } catch (err) {
      console.log('Error occurred:', err); // Log the error details for debugging
      setError('Failed to check email. Please try again.'); // General error message for the user
    } finally {
      setIsChecked(true); // Ensure the API was called and results are now ready to display
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
      {/* Creates a button for checking breaches */}
      
      {/* Show breach information if breaches were found */}
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

      {/* Display "No breaches found" only after checking */}
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
