import { useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import "../global.css";

export default function AppLayout() {
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const onboarded = await AsyncStorage.getItem("hasOnboarded");
        const token = await AsyncStorage.getItem("authToken");

        // ✅ Only redirect if we're at the root (no segments)
        if (!segments.length) {
          if (!onboarded) {
            router.replace("/"); // Onboarding
          } else if (!token) {
            router.replace("/(auth)/login");
          } else {
            router.replace("/(main)/home");
          }
        }
      } catch (err) {
        console.error("Error checking status:", err);
      } finally {
        setChecking(false);
      }
    };

    checkStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="rgb(var(--color-primary))" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Slot />
    </View>
  );
}
