// lib/theme-sync.ts
import { onValue, ref, off } from "firebase/database";
import { defaultTheme } from "./theme";
import { FirebaseDatabase } from "@/services/firebase";

export const syncTheme = (
  themeKey: string,
  setTheme: (t: typeof defaultTheme) => void
) => {
  const themeRef = ref(FirebaseDatabase, `themes/${themeKey}`);

  // Start listening
  const unsubscribe = onValue(themeRef, (snapshot) => {
    const data = snapshot.val();
    // console.log("Theme data from Firebase:", data); // ✅ debug log

    if (data?.colors) {
      setTheme(data);
    } else {
      setTheme(defaultTheme);
    }
  });

  // Return a cleanup function
  return () => {
    off(themeRef); // removes all listeners on this ref
    if (typeof unsubscribe === "function") {
      unsubscribe(); // in case onValue returns a cleanup
    }
  };
};
