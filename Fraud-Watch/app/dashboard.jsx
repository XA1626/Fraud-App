import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Dashboard = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      {/* Add more components as needed */}
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    color: 'black',
    marginBottom: 15,
  },
  // Define styles for buttons or other components if needed
});
