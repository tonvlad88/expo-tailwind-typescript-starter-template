/** @type {import('jest').Config} */
module.exports = {
  preset: "jest-expo",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(?:" +
      "react-native" +
      "|@react-native" +
      "|react-clone-referenced-element" +
      "|react-navigation" +
      "|@react-navigation" +
      "|expo(nent)?" +
      "|@expo(nent)?/.*" +
      "|@unimodules/.*" +
      "|unimodules" +
      "|native-base" +
      "|react-native-svg" +
      "|expo-modules-core" +
      "|react-native-css-interop" +
      ")/)",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
  collectCoverage: true,
  coverageReporters: ["text-summary", "json-summary", "lcov"],
  coverageDirectory: "coverage",
};
