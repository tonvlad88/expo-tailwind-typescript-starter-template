import { useTheme } from "@/providers/theme-context";
import { Text } from "react-native";

type ThemedTabLabelProps = {
  focused: boolean;
  title: string;
};

export function ThemedTabLabel({ focused, title }: ThemedTabLabelProps) {
  const { theme } = useTheme();
  return (
    <Text
      style={{
        color: `rgb(${
          focused ? theme.colors.primary : theme.colors.textSecondary
        })`,
        fontSize: 12,
        fontWeight: "500",
      }}
    >
      {title}
    </Text>
  );
}
