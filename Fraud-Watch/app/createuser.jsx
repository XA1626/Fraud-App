
import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firestore, auth } from './firebase';  // Import Firestore and Firebase Authentication
const CreateUser = ({ onAccountCreated, onAlreadyHaveAccount }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');  // Added username state
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [accountExistsError, setAccountExistsError] = useState('');
    // Email validation
    const validateEmail = (text) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(text)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
            setAccountExistsError('');  // Clear account exists error when a valid email is entered
        }
        setEmail(text);
    };
    // Password validation
    const validatePassword = (text) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(text)) {
            setPasswordError('Password must be 8 characters long, contain an uppercase letter, a symbol, and a number.');
        } else {
            setPasswordError('');
        }
        setPassword(text);
    };
    const handleCreateAccount = async () => {
        if (!emailError && !passwordError && password === confirmPassword) {
            try {
                // Create a new user with Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                // Save user data to Firestore
                await addDoc(collection(firestore, 'User'), {
                    uid: user.uid,
                    username: username,
                    email: email,
                    createdAt: new Date(),
                });
                onAccountCreated(user);  // Perform any additional steps (e.g., navigate to dashboard)
            } catch (error) {
                setAccountExistsError(error.message);  // Display error if something goes wrong
            }
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create your account</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={validateEmail}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            {accountExistsError ? <Text style={styles.errorText}>{accountExistsError}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={validatePassword}
                secureTextEntry
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button
                title="Create your account"
                onPress={handleCreateAccount}
                color="#6A0DAD"
                disabled={!!emailError || !!passwordError || !email || !username || !password || password !== confirmPassword}
            />
            <TouchableOpacity onPress={onAlreadyHaveAccount}>
                <Text style={styles.alreadyAccountText}>Already have an account?</Text>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
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
    alreadyAccountText: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 16,
    },
});
export default CreateUser;


