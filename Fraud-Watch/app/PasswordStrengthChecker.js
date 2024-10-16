import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system'; // Use Expo FileSystem to read the file

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [commonPasswords, setCommonPasswords] = useState([]);

  // Use useEffect to load common passwords from the local file
  useEffect(() => {
    const loadCommonPasswords = async () => {
      try {
        const fileUri = `${FileSystem.documentDirectory}assets/passwords.json`; // Ensure the path is correct
        const fileContent = await FileSystem.readAsStringAsync(fileUri); // Read the file
        console.log('File content:', fileContent); // Log the content of the file
        const passwords = JSON.parse(fileContent); // Parse the JSON content
        setCommonPasswords(passwords); // Set the list of common passwords
        console.log('Common passwords loaded:', passwords); // Log the loaded common passwords
      } catch (err) {
        console.error('Error reading passwords.json:', err);
      }
    };

    loadCommonPasswords(); // Load passwords when the component mounts
  }, []);

  // Function to check the strength of the password
  const checkPasswordStrength = (password) => {
    console.log('Checking password:', password); // Log the password being checked
    let strength = 0;

    const lowerCasePassword = password.toLowerCase(); // Convert the password to lowercase for comparison

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    // Check if the password is in the common passwords list
    if (commonPasswords.map(p => p.toLowerCase()).includes(lowerCasePassword)) {
      console.log('Password is a common password!'); // Log if the password is found in the common list
      return 'Common Password, Avoid!';
    }

    if (strength <= 1) return 'Weak';
    if (strength === 2 || strength === 3) return 'Okay, maybe add some Symbols? E.g "!@#$%^"';
    if (strength >= 4) return 'Strong';
    return 'Very Weak';
  };

  // Handle password change and update the strength
  const handlePasswordChange = (text) => {
    setPassword(text);
    setStrength(checkPasswordStrength(text));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="Enter your password"
      />
      {password.length > 0 && (
        <Text style={styles.strengthText}>
          Strength: <Text style={getStrengthColor(strength)}>{strength}</Text>
        </Text>
      )}
    </View>
  );
};

// Function to return the color based on the password strength
const getStrengthColor = (strength) => {
  switch (strength) {
    case 'Weak':
      return { color: 'red' };
    case 'Common Password, Avoid!':
      return { color: 'red' };
    case 'Okay, maybe add some Symbols? E.g "!@#$%^"':
      return { color: 'orange' };
    case 'Strong':
      return { color: 'green' };
    default:
      return { color: 'gray' };
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  strengthText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PasswordStrengthChecker;
