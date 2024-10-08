import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Customization = ({ onNavigateBack }) => {
  return (
    <View style={styles.container}>
      {/* Back button and Customization Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Customization</Text>
      </View>

      {/* Empty space for future customization options */}
      <View style={styles.content}>
        <Text style={styles.placeholderText}>
          Customization options coming soon...
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28, // Larger font size for emphasis
    fontWeight: "bold", // Bold for stronger visual impact
    color: "#000000", // Custom color for visual appeal
    marginLeft: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 18,
    color: "#888",
  },
});

export default Customization;
