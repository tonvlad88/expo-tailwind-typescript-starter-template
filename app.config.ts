export default {
  expo: {
    name: "ECommercePLP", // ✅ change to your app name
    slug: "ecommerceplp", // ✅ change to your slug
    scheme: "ecommerceplp", // ✅ unique deep link scheme (lowercase, no spaces)
    ios: {
      bundleIdentifier: "com.tonyph.ecommerceplp", // ✅ change to your iOS bundle ID
    },
    android: {
      package: "com.tonyph.ecommerceplp", // ✅ change to your Android package name
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
    },
    userInterfaceStyle: "automatic",
  },
};
