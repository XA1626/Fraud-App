import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'react-native';
import { Link } from 'expo-router';

const RootLayout = () => {
  return (
    <View style={styles.container}>
      <Text>Fraud Watch!</Text>
      <StatusBar style="auto" />
      <Link href="/dashboard" style={{ color: 'blue' }}>Go to Dashboard</Link>
      <Link href="/quiz" style={{ color: 'pink' }}>Go to Quizzes</Link>
    </View>
  )
}

export default RootLayout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})