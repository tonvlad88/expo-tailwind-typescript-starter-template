// components/EmptyState.tsx
import { View, Text, TouchableOpacity } from "react-native";

type EmptyStateProps = {
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const EmptyState = ({
  message = "No data available.",
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-textSecondary text-center">{message}</Text>
      {actionLabel && onAction && (
        <TouchableOpacity
          onPress={onAction}
          className="mt-4 px-4 py-2 bg-primary rounded-md"
        >
          <Text className="text-onPrimary font-medium">{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
