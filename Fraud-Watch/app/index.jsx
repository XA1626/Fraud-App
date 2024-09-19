import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import SplashScreen from './splashscreen';
import LoginPage from './loginpage';
import Dashboard from './dashboard';
import CreateUser from './createuser';
import UrlChecker from './urlchecker';
import Settings from './settings';
import Newsfeed from './newsfeed';
import Account from './account';
import { firebase } from './firebase';
import { fetchUserProfile } from './firebase';

const isWeb = Platform.OS === 'web';

const App = () => {
    const [currentScreen, setCurrentScreen] = useState('SplashScreen');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentScreen('LoginPage');
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleLogin = async (user) => {
        if (user && user.uid) {
            try {
                const userProfile = await fetchUserProfile(user.uid);
                if (!userProfile) {
                    console.error('Error: User profile not found in Firestore');
                    return;
                }
                const completeUser = { ...user, ...userProfile };
                setUserData(completeUser);
                setCurrentScreen('Dashboard');
            } catch (error) {
                console.error("Error fetching user profile: ", error);
            }
        } else {
            console.error("Invalid user data");
        }
    };

    const handleLogout = () => {
        setUserData(null);
        setCurrentScreen('LoginPage');
    };

    const renderScreen = () => {
        switch (currentScreen) {
            case 'LoginPage':
                return (
                    <LoginPage
                        onLogin={(user) => handleLogin(user)}
                        onCreateUser={() => setCurrentScreen('CreateUser')}
                    />
                );
            case 'Dashboard':
                return (
                    <Dashboard
                        userData={userData}
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
                        userData={userData}
                        onNavigateBack={() => setCurrentScreen('Dashboard')}
                        onNavigateToAccount={() => setCurrentScreen('Account')}
                        onLogout={handleLogout}
                    />
                );
            case 'Account':
                return (
                    <Account
                        userData={userData}
                        onNavigateBack={() => setCurrentScreen('Settings')}
                    />
                );
            case 'Newsfeed':
                return <Newsfeed onNavigateBack={() => setCurrentScreen('Dashboard')} />;
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
        color: '#ff006e',
        textShadowColor: '#ff66b2',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#ff66b2',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 50,
        marginVertical: 15,
        transform: [{ rotate: '5deg' }],
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default App;
