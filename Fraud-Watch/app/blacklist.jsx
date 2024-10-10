import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation for navigation control

const Blacklist = ({ onNavigateBack }) => {
  const navigation = useNavigation(); // Hook to access navigation

  // Sample blacklist data of known scam phone numbers
  const [blacklist, setBlacklist] = useState([
    { id: "1", number: "+1234567890" },
    { id: "2", number: "+0987654321" },
    { id: "3", number: "+1123456789" },
  ]);

  // Function to block a phone number and confirm the action
  const blockNumber = (number) => {
    Alert.alert(
      "Blocked",
      `The number ${number} has been blocked from calling you.`
    );
  };

  // Render each item in the blacklist
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.phoneNumber}>{item.number}</Text>
      <TouchableOpacity
        style={styles.blockButton}
        onPress={() => blockNumber(item.number)}
      >
        <FontAwesome name="ban" size={24} color="white" />
        <Text style={styles.blockButtonText}>Block Number</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onNavigateBack} // Navigate back to the previous screen
      >
        <FontAwesome name="arrow-left" size={24} color="#000" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Page Title */}
      <Text style={styles.title}>Blacklist of Known Scam Numbers</Text>

      {/* Display the blacklist */}
      <FlatList
        data={blacklist}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

// Styling for the Blacklist component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20, // Adjust based on platform (iOS/Android)
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 18,
    color: "#000",
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: Platform.OS === "ios" ? 50 : 70, // Adjust position based on platform to avoid overlap
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginVertical: 5,
  },
  phoneNumber: {
    fontSize: 18,
  },
  blockButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff3b30",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  blockButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default Blacklist;
