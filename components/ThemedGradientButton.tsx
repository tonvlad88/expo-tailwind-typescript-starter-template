// components/ThemedGradientButton.tsx
import { Pressable, PressableProps, Text } from "react-native";
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
      className={`rounded-lg overflow-hidden ${className}`}
      disabled={disabled}
    >
      <LinearGradient
        colors={[fromColor, toColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="px-6 py-3 items-center justify-center"
      >
        <Text className="text-white font-semibold text-base">{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}
