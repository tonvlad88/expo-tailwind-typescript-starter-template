import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";
import BackButton from "./BackButton";

type Props = {
  children: React.ReactNode;
  showBackButton?: boolean;
  onBackPress?: () => void;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function ScreenLayout({
  children,
  showBackButton = false,
  onBackPress,
  scroll = true,
  style,
}: Props) {
  const content = (
    <>
      {showBackButton && <BackButton onPress={onBackPress} />}
      {children}
    </>
  );

  return (
    <View className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[{ flex: 1 }, style]}
      >
        {scroll ? (
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {content}
          </ScrollView>
        ) : (
          <View style={{ flex: 1 }}>{content}</View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
