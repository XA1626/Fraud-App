import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Settings = ({ onNavigateBack, onNavigateToAccount, onLogout, userData }) => {
  const [searchText, setSearchText] = useState('');

  // List of settings
  const settings = [
    { name: 'Account', icon: 'user' },
    { name: 'Notifications', icon: 'bell' },
    { name: 'Privacy & Security', icon: 'lock' },
  ];

  // Function to filter settings based on search input
  const filteredSettings = settings.filter(setting =>
    setting.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Back button and Settings Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onNavigateBack}>
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Display User Info */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>{userData?.username || 'User'}</Text>
        <Text style={styles.userEmail}>{userData?.email || 'user@example.com'}</Text>
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
            if (setting.name === 'Account') {
              onNavigateToAccount(); // Navigate to Account screen when "Account" is clicked
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginLeft: 10,
  },
  userInfoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  settingText: {
    fontSize: 18,
    marginLeft: 10,
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default Settings;
