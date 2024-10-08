import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const themes = [
  {
    name: "Light",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    buttonColor: "#e0e0e0",
  },
  {
    name: "Dark",
    backgroundColor: "#333333",
    textColor: "#ffffff",
    buttonColor: "#444444",
  },
  {
    name: "Blue",
    backgroundColor: "#add8e6",
    textColor: "#000080",
    buttonColor: "#87cefa",
  },
];

const Customization = ({ onThemeChange }) => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme.name);
    onThemeChange(theme); // Pass theme data back to the parent or global state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Theme</Text>
      {themes.map((theme, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.themeButton,
            {
              backgroundColor: theme.buttonColor,
            },
          ]}
          onPress={() => handleThemeChange(theme)}
        >
          <Text style={{ color: theme.textColor }}>{theme.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  themeButton: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    width: 150,
    alignItems: "center",
  },
});

export default Customization;
