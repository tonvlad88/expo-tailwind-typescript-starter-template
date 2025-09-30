import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from "@react-native-firebase/auth";

export default function ProfileScreen() {
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();

      const auth = getAuth();
      await signOut(auth);

      Alert.alert("Logged out", "You have been signed out successfully.");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Something went wrong while logging out.");
    }
  };

  return (
    <View className="flex-1 w-full items-center justify-center bg-background">
      <Text className="text-lg font-bold text-textPrimary mb-6">Profile</Text>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-primary px-6 py-3 rounded-lg"
      >
        <Text className="text-white font-semibold">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}