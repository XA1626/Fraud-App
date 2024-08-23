
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, LogBox } from 'react-native';
import SplashScreen from './splashscreen';
import LoginPage from './loginpage';
import Dashboard from './dashboard';
import CreateUser from './createuser';
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
                return <Dashboard />;
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
export default App;
    
