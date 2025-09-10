import { AppRoute } from "@/types/navigation";

export const DEFAULT_ROUTES = {
  login: "/login" as const, // app/(auth)/login.tsx
  resetPassword: "/reset-password" as const, // app/(auth)/reset-password.tsx
  signUp: "/signup" as const, // app/(auth)/signup.tsx
  getStarted: "/getStarted" as const, // app/(public)/getStarted.tsx
  home: "/home" as const, // app/(main)/home/index.tsx
} as const;

export const NEW_DEFAULT_ROUTES = {
  getStarted: "/getStarted" as AppRoute,
  login: "/login" as AppRoute,
  signup: "/signup" as AppRoute,
  resetPassword: "/reset-password" as AppRoute,
  home: "/home" as AppRoute,
};

export const PUBLIC_ROUTES: AppRoute[] = [
  "/login",
  "/signup",
  "/reset-password",
  "/getStarted",
];
