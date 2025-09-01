import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import {
  DOT_SIZE,
  DOT_SCALE_RANGE,
  DOT_OPACITY_RANGE,
} from "@/constants/Onboarding";

type DotProps = {
  index: number;
  currentIndex: number;
  scrollX: Animated.SharedValue<number>;
  screenWidth: number;
};

function Dot({ index, currentIndex, scrollX, screenWidth }: DotProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * screenWidth,
      index * screenWidth,
      (index + 1) * screenWidth,
    ];
    const scale = interpolate(
      scrollX.value,
      inputRange,
      DOT_SCALE_RANGE,
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      DOT_OPACITY_RANGE,
      Extrapolate.CLAMP
    );

    return { transform: [{ scale }], opacity };
  });

  return (
    <Animated.View
      className={`mx-1 rounded-full ${index === currentIndex ? "bg-primary" : "bg-accent"}`}
      style={[animatedStyle, { width: DOT_SIZE, height: DOT_SIZE }]}
    />
  );
}

type PaginationProps = {
  slides: any[];
  currentIndex: number;
  scrollX: Animated.SharedValue<number>;
  screenWidth: number;
};

export default function PaginationDots({
  slides,
  currentIndex,
  scrollX,
  screenWidth,
}: PaginationProps) {
  return (
    <View className="flex-row justify-center items-center mb-6">
      {slides.map((_, i) => (
        <Dot
          key={i}
          index={i}
          currentIndex={currentIndex}
          scrollX={scrollX}
          screenWidth={screenWidth}
        />
      ))}
    </View>
  );
}
