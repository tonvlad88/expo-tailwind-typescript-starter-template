// types/navigation.ts
import { Ionicons } from "@expo/vector-icons";

export type AnimatedTabIconProps = {
  focused: boolean;
  activeName: keyof typeof Ionicons.glyphMap;
  inactiveName: keyof typeof Ionicons.glyphMap;
  activeColor: string;
  inactiveColor: string;
  size: number;
};
