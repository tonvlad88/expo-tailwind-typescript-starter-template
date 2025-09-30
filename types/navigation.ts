// types/navigation.ts
import { DEFAULT_ROUTES } from "@/constants/routes";
import { Ionicons } from "@expo/vector-icons";

export type AnimatedTabIconProps = {
  focused: boolean;
  activeName: keyof typeof Ionicons.glyphMap;
  inactiveName: keyof typeof Ionicons.glyphMap;
  activeColor: string;
  inactiveColor: string;
  size: number;
};

export type AppRoute = (typeof DEFAULT_ROUTES)[keyof typeof DEFAULT_ROUTES];
