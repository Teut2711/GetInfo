import { ExpoConfig, ConfigContext } from "expo/config";
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,

  name: "Get Info",
  slug: "get_info",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/splash.png",
  scheme: "get_info",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ff0000",
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    config: {
      googleMaps: {
        apiKey: process.env.EXPO_PUBLIC_MAPS_API_KEY,
      },
    },
    adaptiveIcon: {
      foregroundImage: "./assets/images/splash.png",
      backgroundColor: "#ffffff",
    },
    package: "com.teut2711.get_info",
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "Allow app to use your location.",
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
});
