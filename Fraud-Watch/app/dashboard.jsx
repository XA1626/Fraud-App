import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';  // Import icons

const Dashboard = () => {
  const slideAnim = useRef(new Animated.Value(500)).current;  // Start off-screen

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,  // Shorter duration for smoother slide
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
      <Text style={styles.title}>Dashboard</Text>

      <TouchableOpacity style={styles.button}>
        <Link href="/quiz" style={styles.buttonText}>
          <FontAwesome name="question-circle" size={24} color="#ff69b4" style={styles.icon} />
          Quiz
        </Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Link href="/newsfeed" style={styles.buttonText}>
          <FontAwesome name="newspaper-o" size={24} color="#ff69b4" style={styles.icon} />
          Newsfeed
        </Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Link href="/url-checking" style={styles.buttonText}>
          <FontAwesome name="link" size={24} color="#ff69b4" style={styles.icon} />
          URL Checking
        </Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Link href="/settings" style={styles.buttonText}>
          <FontAwesome name="cog" size={24} color="#ff69b4" style={styles.icon} />
          Settings
        </Link>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Link href="/notification-alerts" style={styles.buttonText}>
          <FontAwesome name="bell" size={24} color="#ff69b4" style={styles.icon} />
          Notification Alerts
        </Link>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc0cb', // Lighter pink background
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginVertical: 10,
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
