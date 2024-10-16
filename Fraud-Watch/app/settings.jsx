import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { globalStyles, themeColors } from "./styles"; // Import global styles and theme colors

const Settings = ({
  onNavigateBack,
  onNavigateToAccount,
  onNavigateToCustomization,
  onLogout,
}) => {
  const [searchText, setSearchText] = useState("");

  // List of settings
  const settings = [
    { name: "  Account", icon: "user" },
    { name: "Notifications", icon: "bell" },
    { name: "  Privacy & Security", icon: "lock" },
    { name: "Customization", icon: "paint-brush" },
  ];

  // Function to filter settings based on search input
  const filteredSettings = settings.filter((setting) =>
    setting.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View
      style={[
        globalStyles.container,
        { backgroundColor: themeColors.backgroundColor },
      ]}
    >
      {/* Back button and Settings Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="#333" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Dynamically rendered settings based on search */}
      {filteredSettings.map((setting, index) => (
        <TouchableOpacity
          key={index}
          style={styles.settingItem}
          onPress={() => {
            if (setting.name === "  Account") {
              onNavigateToAccount(); // Navigate to Account screen when "Account" is clicked
            } else if (setting.name === "Customization") {
              onNavigateToCustomization(); // Navigate to Customization screen when "Customization" is clicked
            }
          }}
        >
          <FontAwesome name={setting.icon} size={24} color="black" />
          <Text style={styles.settingText}>{setting.name}</Text>
        </TouchableOpacity>
      ))}

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <FontAwesome name="sign-out" size={24} color="black" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    color: "#333",
    fontSize: 16,
    flex: 1,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  settingText: {
    fontSize: 18,
    marginLeft: 10,
  },
  logoutContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default Settings;
