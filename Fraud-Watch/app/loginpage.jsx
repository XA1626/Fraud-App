import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';
// Conditional import for CheckBox
import CheckBox from '@react-native-community/checkbox'; // Native checkbox

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LoginPage = ({ onLogin, onCreateUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            setErrorMessage('Please fill in both email and password.');
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setLoginAttempts(0);
            setErrorMessage('Login successful!');
            setTimeout(() => {
                setErrorMessage('');
                onLogin();
            }, 1000);
        } catch (error) {
            setLoginAttempts(prev => prev + 1);
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
            {/* Fraud Watch logo */}
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Fraud Watch</Text>

            {/* Shadow box around the login section */}
            <View style={styles.shadowBox}>
                <Text style={styles.loginTitle}>Login</Text>
                <Text style={styles.subText}>to Fraud Watch to Stay Alert.</Text>

                {/* Email and Password Fields */}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#fff"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#fff"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                {errorMessage ? <Text style={[styles.errorText, errorMessage === 'Login successful!' && styles.successText]}>{errorMessage}</Text> : null}

                <View style={styles.rememberMeContainer}>
                    {/* Conditional Checkbox rendering */}
                    {Platform.OS === 'web' ? (
                        <input 
                            type="checkbox" 
                            checked={rememberMe} 
                            onChange={() => setRememberMe(!rememberMe)} 
                            style={{ marginRight: 8 }} 
                        />
                    ) : (
                        <CheckBox
                            value={rememberMe}
                            onValueChange={() => setRememberMe(!rememberMe)}
                        />
                    )}
                    <Text style={styles.rememberMeText}>Remember</Text>
                    <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Login Button with Linear Gradient */}
                <LinearGradient
                    colors={['#7130f1', '#e66f26']}  
                    start={{ x: 0, y: 0 }}  
                    end={{ x: 1, y: 0 }}   
                    style={styles.loginButton}
                >
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>LOGIN</Text>
                    </TouchableOpacity>
                </LinearGradient>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have account?</Text>
                    <TouchableOpacity onPress={onCreateUser}>
                        <Text style={styles.createUserText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',  
        padding: 16,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    shadowBox: {
        width: '95%',  
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
        alignItems: 'flex-start',  
    },
    loginTitle: {
        fontSize: 20,  
        fontWeight: 'normal',  
        marginBottom: 5,
        color: '#333',
        textAlign: 'left',  
    },
    subText: {
        fontSize: 12,  
        color: '#777',
        marginBottom: 20,
        textAlign: 'left',  
    },
    input: {
        width: '100%',
        padding: 12,
        marginBottom: 16,
        borderRadius: 10,
        backgroundColor: '#000',
        color: '#fff',  
    },
    rememberMeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',  
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    rememberMeText: {
        fontSize: 10,  
        color: '#333',
    },
    forgotPasswordContainer: {
        marginLeft: 'auto',  
    },
    forgotPasswordText: {
        fontSize: 10,  
        color: '#1E90FF',
        textDecorationLine: 'underline',
    },
    loginButton: {
        width: '100%',  
        paddingVertical: 12,  
        borderRadius: 10,  
        alignItems: 'center',  
        justifyContent: 'center',  
    },
    loginButtonText: {
        color: '#fff',  
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    footerText: {
        fontSize: 10,  
        color: '#777',
    },
    createUserText: {
        fontSize: 10,  
        color: '#1E90FF',
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    successText: {
        color: 'green',
    },
});

export default LoginPage;
