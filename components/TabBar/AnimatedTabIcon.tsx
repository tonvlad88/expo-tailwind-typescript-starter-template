// components/AnimatedTabIcon.tsx
import { Animated } from "react-native";
import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/providers/theme-context";

type AnimatedTabIconProps = {
  focused: boolean;
  activeName: keyof typeof Ionicons.glyphMap;
  inactiveName: keyof typeof Ionicons.glyphMap;
  size: number;
};

export function AnimatedTabIcon({
  focused,
  activeName,
  inactiveName,
  size,
}: AnimatedTabIconProps) {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.2 : 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Ionicons
        name={focused ? activeName : inactiveName}
        size={size}
        color={`rgb(${
          focused ? theme.colors.primary : theme.colors.textSecondary
        })`}
      />
    </Animated.View>
  );
}
