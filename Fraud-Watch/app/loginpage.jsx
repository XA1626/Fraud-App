import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';
const LoginPage = ({ onLogin, onCreateUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginAttempts, setLoginAttempts] = useState(0); // Track login attempts
    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage('Please fill in both email and password.');
            return;
        }
        try {
            // Attempt to sign in with the provided email and password
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Reset login attempts on successful login
            setLoginAttempts(0);
            // Show a success message in green color
            setErrorMessage('Login successful!');
            setTimeout(() => {
                setErrorMessage(''); // Clear the error message before navigating
                onLogin(); // Trigger the `onLogin` callback passed from `App.jsx`
            }, 1000); // Adjust the delay as needed
        } catch (error) {
            setLoginAttempts(prev => prev + 1);
            // Handle different Firebase authentication error codes
            if (loginAttempts >= 3) {
                setErrorMessage('Too many failed attempts. Please reset your password or create a new user.');
            } else {
                setErrorMessage('Incorrect username/password.');
            }
        }
    };
    const handleForgotPassword = () => {
        if (!email) {
            setErrorMessage('Please enter your email address to reset your password.');
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setErrorMessage('Password reset email sent. Check your inbox.');
            })
            .catch(() => {
                setErrorMessage('Error sending password reset email.');
            });
    };
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/fraudwatchlogo.png')}
                style={styles.logo}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none" // Ensure that email input is not capitalized
                keyboardType="email-address" // Use an email keyboard for better UX
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            {errorMessage ? <Text style={[styles.errorText, errorMessage === 'Login successful!' && styles.successText]}>{errorMessage}</Text> : null}
            <Button title="LOGIN" onPress={handleLogin} color="#1E90FF" />
            <TouchableOpacity onPress={onCreateUser}>
                <Text style={styles.createUserText}>Create user</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 32,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    successText: {
        color: 'green', // Change success message color to green
    },
    forgotPasswordText: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 16,
        fontSize: 14, // Reduced font size
    },
    createUserText: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 16,
        fontSize: 14, // Reduced font size
        textTransform: 'capitalize', // Transform to capitalize first letter
    },
});
export default LoginPage;
