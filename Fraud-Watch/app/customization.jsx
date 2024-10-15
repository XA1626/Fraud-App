import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { globalStyles } from "./styles"; // Import global styles

const Customization = ({ onNavigateBack }) => {
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [fontColor, setFontColor] = useState("#000");

  const applyLightTheme = () => {
    setBackgroundColor("#fff");
    setFontColor("#000");
  };

  const applyDarkTheme = () => {
    setBackgroundColor("#333");
    setFontColor("#fff");
  };

  const applyPinkTheme = () => {
    setBackgroundColor("#ffd1dc"); // Pastel Pink
    setFontColor("#000");
  };

  const applyBlueTheme = () => {
    setBackgroundColor("#b3e5fc"); // Pastel Blue
    setFontColor("#000");
  };

  const applyGreenTheme = () => {
    setBackgroundColor("#c8e6c9"); // Pastel Green
    setFontColor("#000");
  };

  const applyYellowTheme = () => {
    setBackgroundColor("#fff9c4"); // Pastel Yellow
    setFontColor("#000");
  };

  const applyMaroonTheme = () => {
    setBackgroundColor("#800000"); // Maroon
    setFontColor("#fff");
  };

  const applyNavyTheme = () => {
    setBackgroundColor("#001f3f"); // Navy Blue
    setFontColor("#fff");
  };

  const applyGreyTheme = () => {
    setBackgroundColor("#4d4d4d"); // Dark Grey
    setFontColor("#fff");
  };

  const applyTealTheme = () => {
    setBackgroundColor("#004d4d"); // Dark Teal
    setFontColor("#fff");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: backgroundColor }}>
      <View style={[globalStyles.container, { backgroundColor }]}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onNavigateBack} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={24} color={fontColor} />
          </TouchableOpacity>
          <Text style={[styles.headerText, { color: fontColor }]}>
            Customization
          </Text>
        </View>

        {/* Content Section */}
        <View style={styles.body}>
          <Text style={[styles.label, { color: fontColor }]}>
            Choose your theme:
          </Text>

          {/* Buttons for theme selection */}
          <View style={styles.themeButtons}>
            <TouchableOpacity
              style={[styles.themeButton, styles.lightTheme]}
              onPress={applyLightTheme}
            >
              <Text style={[styles.buttonText, { color: "#000" }]}>Light</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeButton, styles.yellowTheme]}
              onPress={applyYellowTheme}
            >
              <Text style={[styles.buttonText, { color: "#000" }]}>Yellow</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeButton, styles.greenTheme]}
              onPress={applyGreenTheme}
            >
              <Text style={[styles.buttonText, { color: "#000" }]}>Green</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeButton, styles.pinkTheme]}
              onPress={applyPinkTheme}
            >
              <Text style={[styles.buttonText, { color: "#000" }]}>Pink</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeButton, styles.blueTheme]}
              onPress={applyBlueTheme}
            >
              <Text style={[styles.buttonText, { color: "#000" }]}>Blue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeButton, styles.darkTheme]}
              onPress={applyDarkTheme}
            >
              <Text style={[styles.buttonText, { color: "#fff" }]}>Dark</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeButton, styles.maroonTheme]}
              onPress={applyMaroonTheme}
            >
              <Text style={styles.buttonText}>Maroon</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeButton, styles.navyTheme]}
              onPress={applyNavyTheme}
            >
              <Text style={styles.buttonText}>Navy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeButton, styles.greyTheme]}
              onPress={applyGreyTheme}
            >
              <Text style={styles.buttonText}>Grey</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeButton, styles.tealTheme]}
              onPress={applyTealTheme}
            >
              <Text style={styles.buttonText}>Teal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    paddingRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
  },
  themeButtons: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  themeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    // Shadow styles
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // for Android shadow
  },
  lightTheme: {
    backgroundColor: "#fff",
  },
  darkTheme: {
    backgroundColor: "#333",
  },
  pinkTheme: {
    backgroundColor: "#ffd1dc",
  },
  blueTheme: {
    backgroundColor: "#b3e5fc",
  },
  greenTheme: {
    backgroundColor: "#c8e6c9",
  },
  yellowTheme: {
    backgroundColor: "#fff9c4",
  },
  maroonTheme: {
    backgroundColor: "#800000",
  },
  navyTheme: {
    backgroundColor: "#001f3f",
  },
  greyTheme: {
    backgroundColor: "#4d4d4d",
  },
  tealTheme: {
    backgroundColor: "#004d4d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Customization;
