// components/SuccessState.tsx
import { View, Text } from "react-native";

type SuccessStateProps = {
  message?: string;
};

export const SuccessState = ({
  message = "Operation successful!",
}: SuccessStateProps) => {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Text className="text-success font-semibold">{message}</Text>
    </View>
  );
};
