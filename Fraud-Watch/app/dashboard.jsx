  import React, { useRef, useState } from 'react';
  import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
  import { Link } from 'expo-router';
  import { FontAwesome } from '@expo/vector-icons';

  const Dashboard = () => {
    const [hovered, setHovered] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handleMouseEnter = () => {
      Animated.timing(scaleAnim, {
        toValue: 1.05,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setHovered(true);
    };

    const handleMouseLeave = () => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setHovered(false);
    };

    return (
      <View style={styles.container}>
        <View style={styles.background}>
          <TouchableOpacity
            style={styles.settingsIcon}
            onPress={() => {}}
          >
            <Link href="/settings">
              <FontAwesome name="cog" size={24} color="#ff69b4" />
            </Link>
          </TouchableOpacity>

          <Text style={styles.title}>Dashboard</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { transform: [{ scale: scaleAnim }] }]}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/quiz" style={styles.buttonText}>
                <FontAwesome name="question-circle" size={24} color="#ff69b4" style={styles.icon} />
                Quiz
              </Link>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { transform: [{ scale: scaleAnim }] }]}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/newsfeed" style={styles.buttonText}>
                <FontAwesome name="newspaper-o" size={24} color="#ff69b4" style={styles.icon} />
                Newsfeed
              </Link>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { transform: [{ scale: scaleAnim }] }]}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/urlchecker" style={styles.buttonText}>
    <FontAwesome name="link" size={24} color="#ff69b4" style={styles.icon} />
    URL Checking
  </Link>

            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { transform: [{ scale: scaleAnim }] }]}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/notification-alerts" style={styles.buttonText}>
                <FontAwesome name="bell" size={24} color="#ff69b4" style={styles.icon} />
                Notification Alerts
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  export default Dashboard;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      margin: 0,
      padding: 0,
    },
    background: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff', // Solid white background
    },
    settingsIcon: {
      position: 'absolute',
      top: 20,
      right: 20,
      zIndex: 1,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 50,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5,
    },
    title: {
      fontSize: 30,
      color: '#ff69b4',
      fontWeight: 'bold',
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: '100%',
      paddingHorizontal: 20,
    },
    button: {
      backgroundColor: '#fff',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      margin: 10,
      width: '40%',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
      transform: [{ scale: 1 }],
    },
    buttonText: {
      color: '#ff69b4',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    icon: {
      marginRight: 10,
    },
  });
