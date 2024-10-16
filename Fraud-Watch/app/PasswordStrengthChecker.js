import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import zxcvbn from 'zxcvbn';
import commonPasswords from './passwords.json';

// Get screen dimensions
const { width } = Dimensions.get('window');

const PasswordStrengthChecker = ({ onNavigateBack }) => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [crackTime, setCrackTime] = useState('');
  const [pwnedStatus, setPwnedStatus] = useState(null);

  // Function to check the strength of the password using zxcvbn
  const checkPasswordStrength = (password) => {
    const result = zxcvbn(password);
    setCrackTime(result.crack_times_display.offline_slow_hashing_1e4_per_second);

    // Check if the password is in the common passwords list
    const lowerCasePassword = password.toLowerCase();
    if (commonPasswords.map(p => p.toLowerCase()).includes(lowerCasePassword)) {
      return 'Common Password, Avoid!';
    }

    // Return password strength based on zxcvbn score
    switch (result.score) {
      case 0:
        return 'Very Weak';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return 'Very Weak';
    }
  };

  // Check if the password has been pwned using the API
  const checkIfPasswordPwned = async (password) => {
    try {
      const response = await fetch(`http://localhost:55000/api/check-password?password=${encodeURIComponent(password)}`);
      const data = await response.json();

      if (data.pwned) {
        setPwnedStatus(`Pwned! This password has been exposed ${data.count} times.`);
      } else {
        setPwnedStatus('This password has not been pwned.');
      }
    } catch (error) {
      console.error('Error checking password breach:', error);
      setPwnedStatus('Error checking password breach.');
    }
  };

  // Handle password change and update the strength and crack time dynamically
  const handlePasswordChange = (text) => {
    setPassword(text);
    setStrength(checkPasswordStrength(text));

    if (text.length >= 8) {
      checkIfPasswordPwned(text);
    } else {
      setPwnedStatus(null);
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Back button, maybe change style */}
        <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        {/* Centered logo */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />

        <Text style={styles.label}>Enter Password:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
          placeholder="Enter your password"
        />
        {password.length > 0 && (
          <View>
            <Text style={styles.strengthText}>
              Strength: <Text style={getStrengthColor(strength)}>{strength}</Text>
            </Text>
            <Text style={styles.crackTimeText}>
              Estimated crack time: {crackTime}
            </Text>
            {pwnedStatus && (
              <Text style={styles.pwnedText}>
                {pwnedStatus}
              </Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

// Function to return the color based on the password strength
const getStrengthColor = (strength) => {
  switch (strength) {
    case 'Very Weak':
    case 'Weak':
    case 'Common Password, Avoid!':
      return { color: 'red' };
    case 'Fair':
      return { color: 'orange' };
    case 'Good':
      return { color: 'blue' };
    case 'Strong':
      return { color: 'green' };
    default:
      return { color: 'gray' };
  }
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4fa', 
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
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    width: '100%',
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    width: '100%',
    backgroundColor: '#fff',
  },
  strengthText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  crackTimeText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  pwnedText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
});

export default PasswordStrengthChecker;
