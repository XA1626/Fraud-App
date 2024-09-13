export default {
    expo: {
      name: "Fraud Watch",
      slug: "fraud-watch",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      },
      ios: {
        supportsTablet: true
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff"
        }
      },
      web: {
        favicon: "./assets/favicon.png"
      },
      entryPoint: "./Fraud Watch/app/index.jsx", 
      plugins: [
        "expo-router"
      ]
    }
  };
  