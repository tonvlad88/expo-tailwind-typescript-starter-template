// lib/theme-context.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { defaultTheme } from "../lib/theme";
import { syncTheme } from "../lib/theme-sync";

type ThemeType = typeof defaultTheme;

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
  themeKey: string;
  setThemeKey: (key: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  themeKey: "default",
  setThemeKey: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);
  const [themeKey, setThemeKey] = useState("cms");

  useEffect(() => {
    const unsubscribe = syncTheme(themeKey, setTheme);
    return () => unsubscribe();
  }, [themeKey]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeKey, setThemeKey }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
