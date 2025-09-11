import { Dimensions } from "react-native";

import { ImageSourcePropType } from "react-native";
import { OnboardingImages } from "../assets/images"; // adjust path

export const SCREEN_WIDTH = Dimensions.get("window").width;

// Image sizing
export const IMAGE_WIDTH = SCREEN_WIDTH * 0.8;
export const IMAGE_HEIGHT_FALLBACK = 200;

// Animation timings
export const IMAGE_ANIM_DURATION = 400;
export const TITLE_ANIM_DELAY = 150;
export const DESC_ANIM_DELAY = 300;
export const EXIT_ANIM_DURATION = 300;

// Pagination dots
export const DOT_SIZE = 8; // Tailwind w-2 h-2
export const DOT_SCALE_RANGE = [0.8, 1.4, 0.8];
export const DOT_OPACITY_RANGE = [0.4, 1, 0.4];

export type Slide = {
  key: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
};

export const slides: Slide[] = [
  {
    key: "1",
    title: "Welcome to RoamMate",
    description: "Find your perfect roaming mate with ease and style.",
    image: OnboardingImages.slide1,
  },
  {
    key: "2",
    title: "Smart Matching",
    description: "We use smart filters to match you with ideal roaming mates.",
    image: OnboardingImages.slide2,
  },
  {
    key: "3",
    title: "Start Your Journey",
    description: "Let’s get you set up and ready to explore.",
    image: OnboardingImages.slide3,
  },
];

export const getStartedSlides: Slide[] = [
  {
    key: "1",
    title: "Welcome to RoamMate",
    description: "Find your perfect roaming mate with ease and style.",
    image: OnboardingImages.slide1,
  },
  {
    key: "2",
    title: "Smart Matching",
    description: "We use smart filters to match you with ideal roaming mates.",
    image: OnboardingImages.slide2,
  },
  {
    key: "3",
    title: "Start Your Journey",
    description: "Let’s get you set up and ready to explore.",
    image: OnboardingImages.slide3,
  },
];
