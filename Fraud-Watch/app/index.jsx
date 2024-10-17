import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import SplashScreen from "./splashscreen";
import LoginPage from "./loginpage";
import Dashboard from "./dashboard";
import CreateUser from "./createuser";
import UrlChecker from "./urlchecker";
import Settings from "./settings";
import ChatRoom from "./ChatRoom";
import Newsfeed from "./newsfeed";
import Account from "./account";
import Quiz from "./quiz";
import GmailIntegration from "./gmailintegration";
import { useGmailAuth } from "./GmailAuth";
import { firebase } from "./firebase";
import { fetchUserProfile } from "./firebase";
import Resource from "./resource";
import FakeUserGenerator from "./FakeUserGenerator";
import Customization from "./customization";
import Blacklist from "./blacklist";
import CheckEmail from "./CheckEmail";
import PasswordStrengthChecker from "./PasswordStrengthChecker"; // Add this import
import ScheduleConsultation from "./ScheduleConsultation";
import ScamAlerts from "./ScamAlerts";
import dashboard from './Dashboard';

const isWeb = Platform.OS === "web";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("SplashScreen");
  const [userData, setUserData] = useState(null);

  const goToDashboard = () => {
      setCurrentScreen("Dashboard");
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen("LoginPage");
    }, 2000); // Splash screen duration
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (user) => {
    if (user && user.uid) {
      try {
        const userProfile = await fetchUserProfile(user.uid);

        if (!userProfile) {
          console.error("Error: User profile not found in Firestore");
          return;
        }
        const completeUser = { ...user, ...userProfile };
        setUserData(completeUser);
        setCurrentScreen("Dashboard");
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      }
    } else {
      console.error("Invalid user data");
    }
  };

  const handleLogout = () => {
    setUserData(null);
    setCurrentScreen("LoginPage");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "LoginPage":
        return (
          <LoginPage
            onLogin={(user) => handleLogin(user)}
            onCreateUser={() => setCurrentScreen("CreateUser")}
          />
        );
      case "Dashboard":
        return (
          <Dashboard
            userData={userData}
            onNavigate={(screen) => {
              if (screen === "Settings") {
                setCurrentScreen("Settings");
              } else if (screen === "UrlChecker") {
                setCurrentScreen("UrlChecker");
              } else if (screen === "Newsfeed") {
                setCurrentScreen("Newsfeed");
              } else if (screen === "Resource") {
                setCurrentScreen("Resource");
              } else if (screen === "FakeUserGenerator") {
                setCurrentScreen("FakeUserGenerator");
              } else if (screen === "Quiz") {
                setCurrentScreen("Quiz");
              } else if (screen == "ChatRoom") {
                setCurrentScreen("ChatRoom");
              } else if (screen == "Blacklist") {
                setCurrentScreen("Blacklist");
              } else if (screen == "GmailIntegration") {
                setCurrentScreen("GmailIntegration");
              } else if (screen == "CheckEmail") {
                setCurrentScreen("CheckEmail");
              } else if (screen == "PasswordStrengthChecker") {
                setCurrentScreen("PasswordStrengthChecker"); // Navigate to Password Strength Checker
              }else if (screen == "ScheduleConsultation") { 
                setCurrentScreen("ScheduleConsultation");
            }else if (screen == "ScamAlerts"){
              setCurrentScreen("ScamAlerts");
            }
          }}
          />
        );
      case "CreateUser":
        return (
          <CreateUser
            onAccountCreated={() => setCurrentScreen("LoginPage")}
            onAlreadyHaveAccount={() => setCurrentScreen("LoginPage")}
          />
        );
      case "UrlChecker":
        return <UrlChecker onNavigateBack={() => setCurrentScreen("Dashboard")} />;
      case "Settings":
        return (
          <Settings
            userData={userData}
            onNavigateBack={() => setCurrentScreen("Dashboard")}
            onNavigateToAccount={() => setCurrentScreen("Account")}
            onNavigateToCustomization={() => setCurrentScreen("Customization")}
            onLogout={handleLogout}
          />
        );
      case "Account":
        return (
          <Account
            userData={userData}
            onNavigateBack={() => setCurrentScreen("Settings")}
          />
        );
      case "Blacklist":
        return <Blacklist onNavigateBack={() => setCurrentScreen("Dashboard")} />;
      case "Customization":
        return (
          <Customization
            userData={userData}
            onNavigateBack={() => setCurrentScreen("Settings")}
          />
        );
      case "FakeUserGenerator":
        return <FakeUserGenerator onNavigateBack={() => setCurrentScreen("Dashboard")} />;
      case "Newsfeed":
        return <Newsfeed onNavigateBack={() => setCurrentScreen("Dashboard")} />;
      case "Quiz":
        return <Quiz onNavigateBack={() => setCurrentScreen("Dashboard")} />;
      case "Resource":
        return <Resource onBack={() => setCurrentScreen("Dashboard")} />;
      case "ChatRoom":
        return <ChatRoom onNavigateBack={() => setCurrentScreen("Dashboard")} />;
      case "GmailIntegration":
        return <GmailIntegration onNavigateBack={() => setCurrentScreen("Dashboard")} />;
      case "CheckEmail":
        return <CheckEmail onNavigateBack={() => setCurrentScreen("Dashboard")} />;
      case "PasswordStrengthChecker": 
        return <PasswordStrengthChecker onNavigateBack={() => setCurrentScreen("Dashboard")} />;
      case "ScheduleConsultation":
        return <ScheduleConsultation onNavigateBack={() => setCurrentScreen("Dashboard")} />
      case "ScamAlerts":
        return <ScamAlerts onNavigateBack={() => setCurrentScreen("Dashboard")} />;
      default:
        return <SplashScreen />;
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#ff006e",
    textShadowColor: "#ff66b2",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#ff66b2",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 2,
  },
});

export default App;
