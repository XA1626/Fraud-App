import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firestore, auth } from './firebase';  // Import Firestore and Firebase Authentication

const CreateUser = ({ onAccountCreated, onAlreadyHaveAccount }) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');  // Added first name state
    const [lastName, setLastName] = useState('');    // Added last name state
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
            setPasswordError('Password must be 8+ characters long, contain an uppercase letter, a symbol, and a number.');
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

                // Save user data to Firestore, using `uid` as the document ID
                const userDocRef = doc(firestore, 'User', user.uid);  // Use `uid` as document ID
                await setDoc(userDocRef, {
                    uid: user.uid,  // Save the `uid` field (optional, since it's the document ID)
                    firstName: firstName,
                    lastName: lastName,
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
            
            {/* First Name Field */}
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />

            {/* Last Name Field */}
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />

            {/* Email Field */}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={validateEmail}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            {accountExistsError ? <Text style={styles.errorText}>{accountExistsError}</Text> : null}

            {/* Password Field */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={validatePassword}
                secureTextEntry
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            {/* Confirm Password Field */}
            <TextInput
                style={styles.input}
                placeholder="Confirm password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            {/* Create Account Button */}
            <Button
                title="Create your account"
                onPress={handleCreateAccount}
                color="#6A0DAD"
                disabled={!!emailError || !!passwordError || !email || !firstName || !lastName || !password || password !== confirmPassword}
            />

            {/* Already Have Account Link */}
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
