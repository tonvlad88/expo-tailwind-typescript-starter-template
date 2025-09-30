import { Link } from "expo-router";
import { View, Text } from "react-native";
import { useTheme } from "@/providers/theme-context";
import { ThemedGradientButton } from "@/components/ThemedGradientButton";

export default function NotFoundScreen() {
  const { theme } = useTheme();

  return (
    <View className="flex-1 items-center justify-center px-6 bg-background">
      <Text
        className="text-3xl font-bold mb-2"
        style={{ color: `rgb(${theme.colors.primary})` }}
      >
        404
      </Text>
      <Text
        className="text-lg text-center mb-6"
        style={{ color: `rgb(${theme.colors.textSecondary})` }}
      >
        Oops! The page you’re looking for doesn’t exist.
      </Text>

      <Link href="/" asChild>
        <ThemedGradientButton title="Go Home" onPress={() => {}} />
      </Link>
    </View>
  );
}
