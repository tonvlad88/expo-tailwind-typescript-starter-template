// components/LoadingState.tsx
import { ActivityIndicator, View, Text } from "react-native";

type LoadingStateProps = {
  message?: string;
  size?: "small" | "large";
};

export const LoadingState = ({
  message = "Loading...",
  size = "large",
}: LoadingStateProps) => {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <ActivityIndicator size={size} className="text-primary" />
      {message ? (
        <Text className="mt-2 text-textSecondary">{message}</Text>
      ) : null}
    </View>
  );
};
