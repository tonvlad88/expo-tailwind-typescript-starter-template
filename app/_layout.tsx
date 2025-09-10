import "../global.css";
import { Slot } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

export default function RootLayout() {
  const { checking } = useAuthRedirect();

  if (checking) {
    return (
      <View className="flex-1 items-center justify-center bg-primary">
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return <Slot />;
}
