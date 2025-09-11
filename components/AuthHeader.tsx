import { View, Image, Text } from "react-native";

type AuthHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <View className="items-center mb-6">
      <Image
        source={require("../assets/images/app-logo-wo-bg.png")} // update path to your logo
        style={{ width: 180, height: 180, resizeMode: "contain" }}
      />
      <Text className="text-2xl font-bold text-primary mt-4">{title}</Text>
      {subtitle && (
        <Text className="text-base text-gray-500 text-center mt-1">
          {subtitle}
        </Text>
      )}
    </View>
  );
}
