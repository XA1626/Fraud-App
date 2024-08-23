import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import Dashboard from './dashboard';  // Import the Dashboard component

const RootLayout = () => {
  return (
    <View style={styles.container}>
      <Dashboard />
    </View>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});