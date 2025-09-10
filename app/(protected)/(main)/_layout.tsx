import { AnimatedTabIcon } from "@/components/TabBar/AnimatedTabIcon";
import { ThemedTabLabel } from "@/components/TabBar/ThemedTabLabel";
import { Tabs } from "expo-router";

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60 },
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
              size={size}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <ThemedTabLabel focused={focused} title="Home" />
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
              size={size}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <ThemedTabLabel focused={focused} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
