import "../global.css";
import { Slot } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { ThemeProvider } from "@/providers/theme-context";
import { ThemeWrapper } from "@/providers/theme-wrapper";
import { StaticContentProvider } from "@/providers/static-content-context";

export default function RootLayout() {
  const { checking } = useAuthRedirect();

  if (checking) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <StaticContentProvider>
        <ThemeWrapper>
          <Slot />
        </ThemeWrapper>
      </StaticContentProvider>
    </ThemeProvider>
  );
}
