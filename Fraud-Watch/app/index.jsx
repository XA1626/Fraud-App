import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import SplashScreen from './splashscreen';
import LoginPage from './loginpage';
import Dashboard from './dashboard';
import CreateUser from './createuser';
import UrlChecker from './urlchecker'; // Import the UrlChecker component

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('SplashScreen');

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("Navigating to LoginPage");
            setCurrentScreen('LoginPage');
        }, 2000); // Splash screen duration
        return () => clearTimeout(timer); // Clear the timer if the component unmounts
    }, []);

    const renderScreen = () => {
        switch (currentScreen) {
            case 'LoginPage':
                console.log("Rendering LoginPage");
                return (
                    <LoginPage
                        onLogin={() => {
                            console.log("Login successful, navigating to Dashboard");
                            setCurrentScreen('Dashboard');
                        }}
                        onCreateUser={() => {
                            console.log("Navigating to CreateUser");
                            setCurrentScreen('CreateUser');
                        }}
                    />
                );
            case 'Dashboard':
                console.log("Rendering Dashboard");
                return (
                    <View style={styles.container}>
                        <Text style={styles.title}>🎉 Fraud Watch! 🎉</Text>
                        <StatusBar style="auto" />
                        <TouchableOpacity style={styles.button}>
                            <Link href="/dashboard" style={styles.buttonText}>💥 Dashboard 💥</Link>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Link href="/newsfeed" style={styles.buttonText}>🔥 Newsfeed 🔥</Link>
                        </TouchableOpacity>
                    </View>
                );
            case 'CreateUser':
                console.log("Rendering CreateUser");
                return (
                    <CreateUser
                        onAccountCreated={() => {
                            console.log("Account created, navigating to LoginPage");
                            setCurrentScreen('LoginPage');
                        }}
                        onAlreadyHaveAccount={() => {
                            console.log("Navigating back to LoginPage");
                            setCurrentScreen('LoginPage');
                        }}
                    />
                );
            case 'UrlChecker':
                console.log("Rendering UrlChecker");
                return <UrlChecker />;
            default:
                console.log("Rendering SplashScreen");
                return <SplashScreen />;
        }
    };

    return (
        <View style={styles.container}>
            {renderScreen()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffccf9', // Vibrant pink background
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderWidth: 5,
        borderColor: '#ff66b2', // Bright pink border
        borderRadius: 20,
    },
    title: {
        fontSize: 36,
        fontWeight: '900',
        color: '#ff006e', // Bold magenta text
        textShadowColor: '#ff66b2',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#ff66b2', // Bright pink button
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 50,
        marginVertical: 15,
        transform: [{ rotate: '5deg' }], // Slight rotation for a dynamic look
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
    },
    buttonText: {
        color: '#fff', // White text on button
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
});

export default App;
