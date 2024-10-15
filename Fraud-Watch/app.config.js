export default {
  expo: {
    name: "Fraud Watch",
    scheme: "fraud-watch",
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
      supportsTablet: true,
      bundleIdentifier: "com.fraudwatch.app"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.fraudwatch.app"
    },
    web: {
      bundler: "metro",
      favicon: "./assets/favicon.png"
    },
    extra: {
      hibpApiKey: process.env.HIBP_API_KEY || 'your-fallback-api-key'
    },
    plugins: [
      "expo-router"
    ]
  }
};
