import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';  // Import icons

const Dashboard = ({ onNavigate }) => {
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

      <TouchableOpacity style={styles.button} onPress={() => onNavigate('Quiz')}>
        <FontAwesome name="question-circle" size={24} color="#ff69b4" style={styles.icon} />
        <Text style={styles.buttonText}>Quiz</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => onNavigate('Newsfeed')}>
        <FontAwesome name="newspaper-o" size={24} color="#ff69b4" style={styles.icon} />
        <Text style={styles.buttonText}>Newsfeed</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => onNavigate('UrlChecker')}>
        <FontAwesome name="link" size={24} color="#ff69b4" style={styles.icon} />
        <Text style={styles.buttonText}>URL Checking</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => onNavigate('Settings')}>
        <FontAwesome name="cog" size={24} color="#ff69b4" style={styles.icon} />
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => onNavigate('Notification Alerts')}>
        <FontAwesome name="bell" size={24} color="#ff69b4" style={styles.icon} />
        <Text style={styles.buttonText}>Notification Alerts</Text>
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
