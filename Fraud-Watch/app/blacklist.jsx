import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Blacklist = () => {
  // Sample blacklist data of known scam phone numbers
  const [blacklist, setBlacklist] = useState([
    { id: "1", number: "+1234567890" },
    { id: "2", number: "+0987654321" },
    { id: "3", number: "+1123456789" },
  ]);

  // Function to block a phone number and confirm the action
  const blockNumber = (number) => {
    // Logic to block the number (e.g., call an API, update a blocked list, etc.)
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
