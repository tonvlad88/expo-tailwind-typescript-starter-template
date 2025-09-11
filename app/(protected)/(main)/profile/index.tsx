import { View, Text, TouchableOpacity, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
  const handleLogout = async () => {
    try {
      AsyncStorage.clear();
      await signOut(auth);
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
