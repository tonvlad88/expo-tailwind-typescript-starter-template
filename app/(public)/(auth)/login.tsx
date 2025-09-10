// app/(auth)/login.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // For eye icon
import AuthHeader from "@/components/AuthHeader";
import KeyboardSafeView from "@/components/KeyboardSafeView";
import ScreenLayout from "@/components/ScreenLayout";

export default function LoginScreen() {
  const [email, setEmail] = useState("tonys@test.com");
  const [password, setPassword] = useState("tqbfjotld");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [shakeAnim] = useState(new Animated.Value(0));
  const router = useRouter();

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 6,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -6,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      triggerShake();
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      // _layout.tsx will handle redirect
    } catch (err: any) {
      console.log("err", err.code);
      let message = "Login failed. Please try again.";
      if (err.code === "auth/invalid-email") message = "Invalid email format.";
      if (err.code === "auth/user-not-found")
        message = "No account found with this email.";
      if (err.code === "auth/wrong-password") message = "Incorrect password.";
      setError(message);
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenLayout>
      <Animated.View
        className="flex-1 justify-center px-6"
        style={{ transform: [{ translateX: shakeAnim }] }}
      >
        <AuthHeader
          title="Welcome Back"
          subtitle="Log in to continue your journey"
        />

        {/* Email Input */}
        <TextInput
          className="border border-primary p-3 mb-4 rounded bg-backgroundAlt text-textPrimary"
          placeholder="Email"
          placeholderTextColor="#555555"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Password Input with Toggle */}
        <View className="flex-row items-center border border-primary rounded bg-backgroundAlt mb-2">
          <TextInput
            className="flex-1 p-3 text-textPrimary"
            placeholder="Password"
            placeholderTextColor="#555555"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="px-3"
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#555555"
            />
          </TouchableOpacity>
        </View>

        {/* Inline Error */}
        {error ? (
          <Text className="text-accent mb-4 text-center">{error}</Text>
        ) : null}

        {/* Login Button */}
        <TouchableOpacity
          className="bg-primary p-4 rounded active:bg-primaryDark"
          onPress={handleLogin}
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold">
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity>

        {/* Links */}
        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push("/(auth)/reset-password")}
        >
          <Text className="text-accent text-center font-medium">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-2"
          onPress={() => router.push("/(auth)/signup")}
        >
          <Text className="text-sky text-center font-medium">
            Create an Account
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScreenLayout>
  );
}
