import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useSharedValue } from "react-native-reanimated";
import PaginationDots from "./components/PaginationDots";
import { Slide, slides } from "@/constants/Onboarding";
import SlideItem from "./components/SlideItem";

const { width: screenWidth } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [imageHeights, setImageHeights] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);

  // Measure image aspect ratios
  useEffect(() => {
    const heights = slides.map((slide) => {
      const source = slide.image as number;
      const { width: imgW, height: imgH } = Image.resolveAssetSource(source);
      return screenWidth * 0.8 * (imgH / imgW);
    });
    setImageHeights(heights);
  }, []);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/(auth)/login");
    }
  };

  const renderItem = useCallback(
    ({ item, index }: { item: Slide; index: number }) => (
      <SlideItem
        item={item}
        index={index}
        imageHeight={imageHeights[index]}
        screenWidth={screenWidth}
      />
    ),
    [imageHeights] // only changes if image heights change
  );

  // Memoize keyExtractor too
  const keyExtractor = useCallback((item: Slide) => item.key, []);

  return (
    <View className="flex-1 bg-background">
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(index);
          scrollX.value = e.nativeEvent.contentOffset.x;
        }}
        scrollEventThrottle={16}
      />

      {/* Pagination Dots */}
      <PaginationDots
        slides={slides}
        currentIndex={currentIndex}
        scrollX={scrollX}
        screenWidth={screenWidth}
      />

      {/* Next / Get Started Button */}
      <View className="items-center pb-8">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-primary px-8 py-3 rounded-full active:bg-primaryDark"
        >
          <Text className="text-white text-base font-medium">
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
