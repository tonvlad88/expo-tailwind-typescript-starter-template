// app/(auth)/signup.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useRouter } from "expo-router";
import AuthHeader from "@/components/AuthHeader";
import KeyboardSafeView from "@/components/KeyboardSafeView";
import ScreenLayout from "@/components/ScreenLayout";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created! Please log in.");
      router.replace("/(auth)/login");
    } catch (error: any) {
      Alert.alert("Signup failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout showBackButton={true} onBackPress={() => router.back()}>
      {/* Centered form */}
      <View className="flex-1 justify-center px-6">
        <AuthHeader
          title="Create an Account"
          subtitle="Join RoamMate and start exploring"
        />

        <TextInput
          className="border border-primary p-3 mb-4 rounded bg-backgroundAlt text-textPrimary"
          placeholder="Email"
          placeholderTextColor="#555555"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          className="border border-primary p-3 mb-6 rounded bg-backgroundAlt text-textPrimary"
          placeholder="Password"
          placeholderTextColor="#555555"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          className="bg-primary p-4 rounded active:bg-primaryDark"
          onPress={handleSignup}
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold">
            {loading ? "Creating account..." : "Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}
