import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SplashScreen from './splashscreen';
import LoginPage from './loginpage';
import Dashboard from './dashboard';
import CreateUser from './createuser';
<<<<<<< HEAD
import UrlChecker from './urlchecker'; // Import the UrlChecker component
import Settings from './settings'; // Import the Settings component
import ChatRoom from './ChatRoom'; // This should work if it's in the same folder.
import Newsfeed from './newsfeed'; // Import the Newsfeed component
import Account from './account';  // Import the Account component
import Quiz from './quiz';  // Import the Quiz component
import { firebase } from './firebase'; // Import Firebase config (assuming it is set up)
import { fetchUserProfile } from './firebase'; // Import the function to fetch profile

const isWeb = Platform.OS === 'web';
=======
import UrlChecker from './urlchecker';
import Settings from './settings';
import Newsfeed from './newsfeed';
import Resource from './resource';
import Account from './account'; 
import FakeUserGenerator from './FakeUserGenerator'; 
import { firebase } from './firebase'; 
import { fetchUserProfile } from './firebase';
>>>>>>> origin/main

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
<<<<<<< HEAD
                            } else if (screen === 'Quiz') {
                                setCurrentScreen('Quiz');  // Navigate to Quiz screen
                            }else if (screen == 'ChatRoom'){
                                setCurrentScreen('ChatRoom')
=======
                            } else if (screen === 'Resource') {
                                setCurrentScreen('Resource');
                            } else if (screen === 'FakeUserGenerator') {
                                setCurrentScreen('FakeUserGenerator');
>>>>>>> origin/main
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

            case "UrlChecker":
                return (
                    <UrlChecker
                        onNavigateBack={() => setCurrentScreen("Dashboard")} // Navigate back to Dashboard
                        onNavigate={setCurrentScreen} // Flexibility to navigate to other screens
                    />
                ); 
            
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
<<<<<<< HEAD
                return <Newsfeed />;
            case 'Quiz':  // Add this case to render the Quiz screen
                return (
                    <Quiz
                    onNavigateBack={() => setCurrentScreen('Dashboard')}
                    />
                );
            case 'ChatRoom':
                return(
                    <ChatRoom
                    onNavigateBack={() => setCurrentScreen('Dashboard')}
                    />
                );

=======
                return <Newsfeed onNavigateBack={() => setCurrentScreen('Dashboard')} />;
            case 'Resource':
                return <Resource onBack={() => setCurrentScreen('Dashboard')} />;
            case 'FakeUserGenerator':
                return <FakeUserGenerator onNavigate={setCurrentScreen} />;
>>>>>>> origin/main
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
