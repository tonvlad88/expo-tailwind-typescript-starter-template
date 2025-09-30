import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ViewStyle,
  StyleProp,
} from "react-native";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function KeyboardSafeView({ children, style }: Props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[{ flex: 1 }, style]}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
