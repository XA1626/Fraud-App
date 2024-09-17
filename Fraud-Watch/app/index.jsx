import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import SplashScreen from './splashscreen';
import LoginPage from './loginpage';
import Dashboard from './dashboard';
import CreateUser from './createuser';
import UrlChecker from './urlchecker'; // Import the UrlChecker component
import Settings from './settings'; // Import the Settings component
import Newsfeed from './newsfeed'; // Import the Newsfeed component
import Account from './account';  // Import the Account component
import { Platform } from 'react-native';
import { firebase } from './firebase'; // Import Firebase config (assuming it is set up)

const isWeb = Platform.OS === 'web';

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('SplashScreen');
    const [userData, setUserData] = useState(null); // Hold the logged-in user's data

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentScreen('LoginPage');
        }, 2000); // Splash screen duration
        return () => clearTimeout(timer);
    }, []);

    const handleLogin = (user) => {
        setUserData(user); // Save logged-in user data
        setCurrentScreen('Dashboard');
    };

    const handleLogout = () => {
        setUserData(null); // Clear user data on logout
        setCurrentScreen('LoginPage');
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 'LoginPage':
                return (
                    <LoginPage
                        onLogin={(user) => {
                            handleLogin(user); // Call the login handler with user data
                        }}
                        onCreateUser={() => setCurrentScreen('CreateUser')}
                    />
                );
            case 'Dashboard':
                return (
                    <Dashboard
                        onNavigate={(screen) => {
                            if (screen === 'Settings') {
                                setCurrentScreen('Settings');
                            } else if (screen === 'UrlChecker') {
                                setCurrentScreen('UrlChecker');
                            } else if (screen === 'Newsfeed') {
                                setCurrentScreen('Newsfeed');
                            }
                        }}
                    />
                );
            case 'CreateUser':
                return (
                    <CreateUser
                        onAccountCreated={() => setCurrentScreen('LoginPage')}
                        onAlreadyHaveAccount={() => setCurrentScreen('LoginPage')}
                    />
                );
            case 'UrlChecker':
                return <UrlChecker />;
            case 'Settings':
                return (
                    <Settings
                        onNavigateBack={() => setCurrentScreen('Dashboard')}
                        onNavigateToAccount={() => setCurrentScreen('Account')} // Navigate to Account screen
                        onLogout={handleLogout} // Handle logout
                    />
                );
            case 'Account':
                return (
                    <Account
                        userData={userData} // Pass user data to Account component
                        onNavigateBack={() => setCurrentScreen('Settings')}
                    />
                );
            case 'Newsfeed':
                return <Newsfeed />;
            default:
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
