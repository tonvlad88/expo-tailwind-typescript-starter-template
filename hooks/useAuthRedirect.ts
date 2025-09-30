import { useEffect, useRef, useState } from "react";
import { useRouter, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebaseAuth } from "@/services/firebase"; // 👈 from your new firebase.ts
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NEW_DEFAULT_ROUTES, PUBLIC_ROUTES } from "@/constants/routes";
import { AppRoute } from "@/types/navigation";

export function useAuthRedirect() {
  const router = useRouter();
  const segments = useSegments();
  const lastTarget = useRef<AppRoute | null>(null);
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const prevUser = useRef<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
  console.log("Setting up onAuthStateChanged listener...");
  const unsub = firebaseAuth.onAuthStateChanged(async (firebaseUser) => {
    console.log("Auth state changed:", firebaseUser?.uid);
    try {
      const onboarded = await AsyncStorage.getItem("hasOnboarded");
      console.log("Onboarded:", onboarded);
      // ... rest of your logic
    } catch (e) {
      console.error("AsyncStorage error", e);
    }
    setChecking(false);
  });

  return unsub;
}, [segments]);

  useEffect(() => {
    // Native Firebase: subscribe via onAuthStateChanged on the module
    const unsub = firebaseAuth.onAuthStateChanged(async (firebaseUser) => {
      const onboarded = await AsyncStorage.getItem("hasOnboarded");

      const currentRoute =
        `/${segments.filter((s) => !s.startsWith("(")).join("/")}` as AppRoute;
      const isPublic = PUBLIC_ROUTES.includes(currentRoute);

      let target: AppRoute = currentRoute;

      if (onboarded) {
        target = NEW_DEFAULT_ROUTES.getStarted;
      } else if (!firebaseUser && !isPublic) {
        target = NEW_DEFAULT_ROUTES.login;
      } else if (firebaseUser && !prevUser.current) {
        // Just logged in → always go home
        target = NEW_DEFAULT_ROUTES.home;
      } else if (firebaseUser && isPublic) {
        // Logged in but on a public route → go home
        target = NEW_DEFAULT_ROUTES.home;
      }

      prevUser.current = firebaseUser;

      if (target !== currentRoute && target !== lastTarget.current) {
        lastTarget.current = target;
        router.replace(target);
      }

      setUser(firebaseUser);
      setChecking(false);
    });

    return unsub;
  }, [segments]);

  return { checking, user };
}