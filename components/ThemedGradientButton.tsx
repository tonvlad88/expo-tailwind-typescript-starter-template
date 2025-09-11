// components/ThemedGradientButton.tsx
import { Pressable, PressableProps, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/providers/theme-context";

type ThemedGradientButtonProps = PressableProps & {
  title: string;
  onPress: () => void;
  className?: string; // optional extra Tailwind classes
};

export function ThemedGradientButton({
  title,
  onPress,
  className = "",
  disabled,
}: ThemedGradientButtonProps) {
  const { theme } = useTheme();

  const fromColor = `rgb(${theme.gradients.brand.from})`;
  const toColor = `rgb(${theme.gradients.brand.to})`;

  return (
    <Pressable
      onPress={onPress}
      className={`rounded-lg ${className}`}
      disabled={disabled}
    >
      <View className="rounded-lg overflow-hidden">
        <LinearGradient
          colors={[fromColor, toColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="items-center justify-center overflow-hidden"
        >
          <Text className="px-6 py-3 text-white font-semibold text-base text-center">
            {title}
          </Text>
        </LinearGradient>
      </View>
    </Pressable>
  );
}
