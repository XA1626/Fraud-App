import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'react-native';
import { Link } from 'expo-router';
import React, { useRef, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';  // Import icons

const RootLayout = () => {
  const slideAnim = useRef(new Animated.Value(-500)).current;  // Start off-screen

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,  // Shorter duration for smoother slide
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <Text style={styles.title}>Fraud Watch!</Text>
      <StatusBar style="light" />
      <TouchableOpacity style={styles.button}>
        <Link href="/dashboard" style={styles.buttonText}>
          <FontAwesome name="dashboard" size={24} color="#ff69b4" style={styles.icon} />
          Go to Dashboard
        </Link>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc0cb', // Lighter pink background
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    width: '80%',  // Ensure buttons have the same width
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#ff69b4',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
});
