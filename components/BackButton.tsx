import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

type Props = {
  label?: string;
  onPress?: () => void;
  position?: "top-left" | "inline";
};

export default function BackButton({
  label = "← Back",
  onPress,
  position = "top-left",
}: Props) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  const containerStyles =
    position === "top-left" ? "absolute top-12 left-6" : "my-4 items-start";

  return (
    <View className={containerStyles}>
      <TouchableOpacity onPress={handlePress}>
        <Text className="text-primary font-medium">{label}</Text>
      </TouchableOpacity>
    </View>
  );
}
