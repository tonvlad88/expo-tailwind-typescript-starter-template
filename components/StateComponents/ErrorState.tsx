// components/ErrorState.tsx
import { View, Text, TouchableOpacity } from "react-native";

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

export const ErrorState = ({
  message = "Something went wrong.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-error font-semibold text-center">{message}</Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="mt-4 px-4 py-2 bg-accent rounded-md"
        >
          <Text className="text-white font-medium">Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
