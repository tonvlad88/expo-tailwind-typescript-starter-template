// app/(auth)/reset-password.tsx
import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useRouter } from "expo-router";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReset = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Email Sent",
        "If an account exists for this email, you’ll receive a password reset link."
      );
      router.replace("/(auth)/login");
    } catch (error: any) {
      Alert.alert("Reset failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background">
      {/* Back Button - top left */}
      <View className="absolute top-12 left-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-primary font-medium">← Back</Text>
        </TouchableOpacity>
      </View>

      {/* Centered form */}
      <View className="flex-1 justify-center px-6">
        <Text className="text-3xl font-bold mb-6 text-textPrimary text-center">
          Reset Password
        </Text>

        <TextInput
          className="border border-primary p-3 mb-6 rounded bg-backgroundAlt text-textPrimary"
          placeholder="Email"
          placeholderTextColor="#555555"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity
          className="bg-accent p-4 rounded active:bg-primaryDark"
          onPress={handleReset}
          disabled={loading}
        >
          <Text className="text-textPrimary text-center font-semibold">
            {loading ? "Sending..." : "Send Reset Email"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
