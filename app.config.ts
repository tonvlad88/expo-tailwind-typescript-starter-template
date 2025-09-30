import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Casa Mira South App",
  slug: "cms-app",
  scheme: "cms-app",
  ios: {
    bundleIdentifier: "com.tonyph.cmsapp",
    googleServicesFile: "./GoogleService-Info.plist"
  },
  android: {
    package: "com.tonyph.cmsapp",
    googleServicesFile: "./google-services.json"
  },
  extra: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    eas: {
      projectId:
        process.env.EXPO_EAS_PROJECT_ID ??
        "aed43bc9-f7b3-4c31-801b-965e7a113261"
    }
  },
  userInterfaceStyle: "automatic",
  plugins: [
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static", // 👈 this enables modular headers
        }
      }
    ],
    "@react-native-firebase/app"
  ]
});