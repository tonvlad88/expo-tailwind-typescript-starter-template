// components/ThemeWrapper.tsx
import { View } from "react-native";
import { vars } from "nativewind";
import { useTheme } from "@/providers/theme-context";

type ThemeWrapperProps = {
  children: React.ReactNode;
};

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { theme } = useTheme();

  // Auto-map all theme.colors keys to CSS variables
  const variableMap: Record<string, string> = {};
  if (theme?.colors) {
    Object.entries(theme.colors).forEach(([key, value]) => {
      // Convert camelCase to kebab-case for CSS variable naming
      const kebabKey = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      variableMap[`--color-${kebabKey}`] = value;
    });
  }

  return (
    <View style={vars(variableMap)} className="flex-1 bg-background">
      {children}
    </View>
  );
}
