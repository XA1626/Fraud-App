import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Link } from 'expo-router';

const RootLayout = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Fraud Watch! 🎉</Text>
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.button}>
        <Link href="/dashboard" style={styles.buttonText}>💥 Dashboard 💥</Link>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Link href="/newsfeed" style={styles.buttonText}>🔥 Newsfeed 🔥</Link>
      </TouchableOpacity>
    </View>
  )
}

export default RootLayout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffccf9', // Vibrant pink background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 5,
    borderColor: '#ff66b2', // Bright pink border
    borderRadius: 20,
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
