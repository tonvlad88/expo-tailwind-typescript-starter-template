import { View } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { ImageSourcePropType } from "react-native";

import {
  IMAGE_HEIGHT_FALLBACK,
  IMAGE_ANIM_DURATION,
  TITLE_ANIM_DELAY,
  DESC_ANIM_DELAY,
} from "@/constants/Onboarding";

type Slide = {
  key: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
};

type Props = {
  item: Slide;
  index: number;
  imageHeight: number;
  screenWidth: number;
};

export default function SlideItem({
  item,
  index,
  imageHeight,
  screenWidth,
}: Props) {
  return (
    <Animated.View
      entering={FadeInRight.duration(400)}
      exiting={FadeOutLeft.duration(300)}
      style={{ width: screenWidth }}
    >
      <View className="flex-1 items-center justify-center px-6">
        {/* Image animates immediately */}
        <Animated.Image
          source={item.image}
          style={{
            width: screenWidth * 0.8,
            height: imageHeight || IMAGE_HEIGHT_FALLBACK,
          }}
          className="rounded-xl mb-6"
          resizeMode="contain"
          entering={FadeInRight.duration(400)}
        />

        {/* Title animates after 150ms */}
        <Animated.Text
          className="text-2xl font-bold text-center mb-2 text-textPrimary"
          entering={FadeInRight.duration(IMAGE_ANIM_DURATION).delay(
            TITLE_ANIM_DELAY
          )}
        >
          {item.title}
        </Animated.Text>

        {/* Description animates after 300ms */}
        <Animated.Text
          className="text-base text-center text-textSecondary"
          entering={FadeInRight.duration(IMAGE_ANIM_DURATION).delay(
            DESC_ANIM_DELAY
          )}
        >
          {item.description}
        </Animated.Text>
      </View>
    </Animated.View>
  );
}
