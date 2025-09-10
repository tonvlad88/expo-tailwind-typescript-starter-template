import { Tabs } from "expo-router";
import { Animated } from "react-native";
import { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedTabIconProps } from "@/types/navigation";

// Animated icon wrapper (Expo Go safe: only animates scale)
function AnimatedTabIcon({
  focused,
  activeName,
  inactiveName,
  activeColor,
  inactiveColor,
  size,
}: AnimatedTabIconProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.2 : 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Ionicons
        name={focused ? activeName : inactiveName}
        size={size}
        color={focused ? activeColor : inactiveColor}
      />
    </Animated.View>
  );
}

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#fffaf0" }, // background
        tabBarActiveTintColor: "#4CAF50", // primary
        tabBarInactiveTintColor: "#555555", // textSecondary
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, size }) => (
            <AnimatedTabIcon
              focused={focused}
              activeName="home"
              inactiveName="home-outline"
              activeColor="#4CAF50" // primary
              inactiveColor="#555555" // textSecondary
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, size }) => (
            <AnimatedTabIcon
              focused={focused}
              activeName="person"
              inactiveName="person-outline"
              activeColor="#4CAF50" // primary
              inactiveColor="#555555" // textSecondary
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
