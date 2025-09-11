// app/(auth)/login.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AuthHeader from "@/components/AuthHeader";
import ScreenLayout from "@/components/ScreenLayout";
import { auth } from "@/services/firebase";
import { ThemedGradientButton } from "@/components/ThemedGradientButton";

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
    } catch (err: any) {
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
          className="border border-primary p-3 mb-4 rounded bg-surface text-textPrimary"
          placeholder="Email"
          placeholderTextColor="rgb(var(--color-text-secondary))"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Password Input */}
        <View className="flex-row items-center border border-primary rounded bg-surface mb-2">
          <TextInput
            className="flex-1 p-3 text-textPrimary"
            placeholder="Password"
            placeholderTextColor="rgb(var(--color-text-secondary))"
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
              color="rgb(var(--color-text-secondary))"
            />
          </TouchableOpacity>
        </View>

        {/* Error */}
        {error ? (
          <Text className="text-accent mb-4 text-center">{error}</Text>
        ) : null}

        {/* Login Button */}
        <ThemedGradientButton
          title={loading ? "Logging in..." : "Login"}
          onPress={handleLogin}
          className="mt-4"
        />

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
          <Text className="text-secondary text-center font-medium">
            Create an Account
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScreenLayout>
  );
}
