import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function LoginScreen() {
  return (
    <View className="flex-1 bg-background px-6 justify-center">
      <Text className="text-3xl font-bold text-textPrimary mb-8 text-center">
        Welcome Back
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        className="border border-accent rounded-lg px-4 py-3 mb-4 text-textPrimary"
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        className="border border-accent rounded-lg px-4 py-3 mb-6 text-textPrimary"
      />

      <TouchableOpacity className="bg-primary active:bg-primaryDark py-3 rounded-full">
        <Text className="text-white text-center font-medium">Log In</Text>
      </TouchableOpacity>

      <Text className="text-center mt-4 text-textSecondary">
        Don’t have an account? <Text className="text-primary">Sign Up</Text>
      </Text>
    </View>
  );
}
