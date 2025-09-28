import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStaticContent } from "@/providers/static-content-context";
import { LoadingState } from "@/components/StateComponents/LoadingState";
import { ErrorState } from "@/components/StateComponents/ErrorState";

const { height, width } = Dimensions.get("window");

export default function GetStarted() {
  const router = useRouter();
  const [startAnimation, setStartAnimation] = useState(false);
  const [hideAppName, setHideAppName] = useState(false);
  const { contents, loading, error, refetch } = useStaticContent();

  // Reanimated shared values
  const appNameY = useSharedValue(height / 2 - 60);
  const appNameOpacity = useSharedValue(1);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);

      // Animate app name up and fade out
      appNameY.value = withTiming(60, { duration: 1000 });
      appNameOpacity.value = withTiming(0, { duration: 1000 });

      // Show content after app name animation
      contentOpacity.value = withDelay(1000, withTiming(1, { duration: 800 }));

      // Hide app name after animation completes
      setTimeout(() => setHideAppName(true), 1000);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Animated styles
  const appNameStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: appNameY.value }],
    opacity: appNameOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  if (loading) return <LoadingState />;
  if (error) return <ErrorState onRetry={refetch} />;

  return (
    <View className="flex-1 bg-primary">
      {/* Animated App Name */}
      {!hideAppName && (
        <Animated.View
          style={appNameStyle}
          className="absolute top-0 left-0 right-0 items-center"
        >
          <View className="items-center">
            <Text className="text-white text-5xl font-extrabold tracking-wide text-center">
              {contents?.getStarted?.appName1 ?? "App Name 1"}
            </Text>
            <Text className="text-white text-5xl font-extrabold tracking-wide text-center">
              {contents?.getStarted?.appName2 ?? "App Name 2"}
            </Text>
          </View>
        </Animated.View>
      )}

      {/* Centered Content */}
      {startAnimation && (
        <Animated.View
          style={contentStyle}
          className="flex-1 items-center justify-center bg-background px-6"
        >
          <Image
            source={require("../assets/images/app-logo-wo-bg.png")}
            style={{
              width: width * 0.5,
              height: width * 0.5,
              resizeMode: "contain",
            }}
            className="mb-10"
          />

          <Text className="text-textPrimary text-5xl font-bold text-center mb-4">
            {contents?.getStarted?.appTagline ?? "App Tagline 1"}
          </Text>
          <Text className="text-textSecondary text-xl text-center mb-10">
            {contents?.getStarted?.appTagline2 ?? "App Tagline 2"}
          </Text>

          <TouchableOpacity
            className="bg-accent py-4 px-12 rounded-full shadow-lg"
            onPress={() => {
              AsyncStorage.setItem("hasOnboarded", "1");
              router.push("/login");
            }}
          >
            <Text className="text-white text-lg font-bold">
              {contents?.getStarted?.buttonTitle ?? "Get Started"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}
