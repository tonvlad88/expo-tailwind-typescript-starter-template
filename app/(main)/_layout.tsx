// app/(main)/_layout.tsx
import { Tabs } from "expo-router";

export default function MainLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "rgb(var(--color-primary))" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        tabBarActiveTintColor: "rgb(var(--color-primary))",
        tabBarInactiveTintColor: "rgb(var(--color-textSecondary))",
        tabBarStyle: { backgroundColor: "rgb(var(--color-background))" },
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
