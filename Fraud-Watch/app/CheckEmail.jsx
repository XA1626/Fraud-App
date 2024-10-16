import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const CheckEmail = ({ onNavigateBack }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [breaches, setBreaches] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previousEmail, setPreviousEmail] = useState('');

  const handleCheckEmail = async () => {
    // Prevent multiple requests at the same time
    if (isLoading) return;

    setError('');
    setBreaches([]);
    setIsChecked(false);
    setIsLoading(true);

    // Check if the email is valid
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      // Make the API request
      const response = await fetch(`http://localhost:55000/api/check-email?email=${encodeURIComponent(email)}`);

      if (response.ok) {
        const data = await response.json();
        setPreviousEmail(email);

        if (data.length === 0) {
          // No breaches found
          setError('No breaches found for this email.');
        } else {
          // Breaches found
          setBreaches(data);
          setError(''); // Clear error
        }
      } else {
        // Handle non-OK responses
        const errorData = await response.json();
        setError(errorData.error || 'Failed to check email. Please try again.');
      }

      setIsChecked(true);
    } catch (err) {
      console.error('Error checking email:', err);
      setError('Failed to check email. Please try again.');
      setIsChecked(false);
    } finally {
      setIsLoading(false); // Allow another request after completion
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          editable={!isLoading} // Disable input when loading
        />
        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          onPress={handleCheckEmail}
          style={styles.checkButton}
          disabled={isLoading} // Disable button when loading
        >
          <Text style={styles.checkButtonText}>{isLoading ? 'Checking...' : 'Check if Pwned'}</Text>
        </TouchableOpacity>

        {isChecked && breaches.length > 0 && (
          <View style={styles.breachContainer}>
            <Text style={styles.title}>Breaches for {previousEmail}:</Text>
            {breaches.map((breach) => (
              <View key={breach.Name} style={styles.breachItem}>
                <Image source={{ uri: breach.LogoPath }} style={styles.breachLogo} />
                <Text style={styles.boldText}>Website: {breach.Domain}</Text>
                <Text style={styles.boldText}>Date Pwned: {breach.BreachDate}</Text>
                <Text style={styles.boldText}>Compromised Data: {breach.DataClasses.join(', ')}</Text>
                <Text>{breach.Description}</Text>
              </View>
            ))}
          </View>
        )}

        {isChecked && breaches.length === 0 && (
          <Text style={styles.noBreach}>No breaches found for this email.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f5',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  checkButton: {
    backgroundColor: '#ff66b2',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  checkButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  backText: {
    fontSize: 18,
    color: '#ff006e',
    fontWeight: 'bold',
  },
  breachContainer: {
    marginTop: 20,
    backgroundColor: '#ffebeb',
    padding: 15,
    borderRadius: 8,
    borderColor: 'red',
    borderWidth: 2,
    width: '100%',
  },
  breachItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
  },
  breachLogo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  noBreach: {
    marginTop: 20,
    color: 'green',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default CheckEmail;
