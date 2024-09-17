import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import SplashScreen from './splashscreen';
import LoginPage from './loginpage';
import Dashboard from './dashboard';
import CreateUser from './createuser';
import UrlChecker from './urlchecker'; // Import the UrlChecker component
import Settings from './settings'; // Import the Settings component
import Newsfeed from './newsfeed'; // Import the Newsfeed component
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

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
                    <Dashboard
                        onNavigate={(screen) => {
                            if (screen === 'Settings') {
                                console.log("Navigating to Settings");
                                setCurrentScreen('Settings');
                            } else if (screen === 'UrlChecker') {
                                console.log("Navigating to UrlChecker");
                                setCurrentScreen('UrlChecker');
                            } else if (screen === 'Newsfeed') {
                                console.log("Navigating to Newsfeed");
                                setCurrentScreen('Newsfeed');
                            }
                        }}
                    />
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
            case 'Settings':
                console.log("Rendering Settings");
                return (
                    <Settings
                        onNavigateBack={() => {
                            console.log("Navigating back to Dashboard");
                            setCurrentScreen('Dashboard');
                        }}
                        onLogout={() => {
                            console.log("Logging out, navigating to LoginPage");
                            setCurrentScreen('LoginPage'); // Log out and go back to the login screen
                        }}
                    />
                );
            case 'Newsfeed':
                console.log("Rendering Newsfeed");
                return <Newsfeed />; // Render the Newsfeed component
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
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
