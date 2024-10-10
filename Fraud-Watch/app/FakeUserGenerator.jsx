import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  TextInput,
  Clipboard,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation for navigation control

// Utility function to generate a random item from an array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const FakeUserGenerator = ({ onNavigateBack }) => {
  const navigation = useNavigation(); // Hook to access navigation

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tempEmail, setTempEmail] = useState("");

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert("Copied to clipboard!"); // Notification to user
  };

  // Generate fake user credentials on button click
  const generateFakeUser = () => {
    const generatedUsername = generateUsername();
    setUsername(generatedUsername);
    setPassword(generatePassword());
    setTempEmail(generateTempEmail(generatedUsername)); // Generate email based on the username
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={onNavigateBack} // Navigate directly to Dashboard screen
      >
        <FontAwesome name="arrow-left" size={24} color="#000" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Header Image */}
      <Image
        source={require("../assets/fakeusergen2.jpg")} // Adjust path to your image
        style={styles.image}
      />

      <Text style={styles.title}>Fake User Generator</Text>

      {/* Username Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={username}
          editable={false}
          placeholder="Generated Username"
        />
        <TouchableOpacity
          onPress={() => copyToClipboard(username)}
          style={{ alignSelf: "flex-end", marginLeft: 10, top: -9 }}
        >
          <FontAwesome name="copy" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={password}
          editable={false}
          placeholder="Generated Password"
          secureTextEntry
        />
        <TouchableOpacity
          onPress={() => copyToClipboard(password)}
          style={{ alignSelf: "flex-end", marginLeft: 10, top: -9 }}
        >
          <FontAwesome name="copy" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Temp Mail Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={tempEmail}
          editable={false}
          placeholder="Temporary Email"
        />
        <TouchableOpacity
          onPress={() => copyToClipboard(tempEmail)}
          style={{ alignSelf: "flex-end", marginLeft: 10, top: -9 }}
        >
          <FontAwesome name="copy" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Generate Button */}
      <TouchableOpacity style={styles.button} onPress={generateFakeUser}>
        <Text style={styles.buttonText}>Generate Fake User</Text>
      </TouchableOpacity>
    </View>
  );
};

// Get device dimensions for responsive design
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Consistent background color with Dashboard and Settings
    justifyContent: "center",
    alignItems: "center",
    padding: 16, // Add padding to match other components
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#333", // Consistent text color
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginTop: 10,
  },
  buttonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "600",
  },
  image: {
    backgroundColor: "#fff",
    width: 200,
    height: 200,
  },
});

export default FakeUserGenerator;
