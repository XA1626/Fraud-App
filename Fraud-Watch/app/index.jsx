import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import SplashScreen from './splashscreen';
import LoginPage from './loginpage';
import Dashboard from './dashboard';
import CreateUser from './createuser';
import UrlChecker from './urlchecker'; 
import Settings from './settings'; 
import ChatRoom from './ChatRoom'; 
import Newsfeed from './newsfeed'; 
import Account from './account';  
import Quiz from './quiz';  
import GmailIntegration from './gmailintegration'; // Ensure the file is named exactly "gmailintegration.jsx"
import { firebase } from './firebase'; 
import { fetchUserProfile } from './firebase'; 
import Resource from './resource';
import FakeUserGenerator from './FakeUserGenerator'; 

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
                        onNavigate={(screen) => setCurrentScreen(screen)}
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
                return <Newsfeed />;
            case 'Quiz':
                return (
                    <Quiz
                    onNavigateBack={() => setCurrentScreen('Dashboard')}
                    />
                );
            case 'ChatRoom':
                return (
                    <ChatRoom
                    onNavigateBack={() => setCurrentScreen('Dashboard')}
                    />
                );
            case 'GmailIntegration': 
                return (
                    <GmailIntegration
                        onNavigateBack={() => setCurrentScreen('Dashboard')}
                    />
                );
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
});

export default App;
