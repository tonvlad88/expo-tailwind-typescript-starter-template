import { View, Text, TouchableOpacity } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-backgroundAlt px-6 pt-12">
      <Text className="text-2xl font-bold text-textPrimary mb-4">
        Hello, Mark 👋
      </Text>
      <Text className="text-base text-textSecondary mb-8">
        Ready to find your next roaming mate?
      </Text>

      <TouchableOpacity className="bg-primary active:bg-primaryDark py-3 px-6 rounded-full">
        <Text className="text-white font-medium">Start Matching</Text>
      </TouchableOpacity>
    </View>
  );
}
