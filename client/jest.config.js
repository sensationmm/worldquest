/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('lodash');
const expoPreset = require('jest-expo/jest-preset');
// const expoAndroidPreset = require('jest-expo/android/jest-preset');
// const expoIosPreset = require('jest-expo/ios/jest-preset');
const testingLibraryPreset = require('@testing-library/react-native/jest-preset');
module.exports = merge({}, expoPreset, testingLibraryPreset, {
  clearMocks: true,
  cacheDirectory: '.jest',
  coverageDirectory: './test-reports/coverage',
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native' +
      '|unimodules-permissions-interface' +
      '|react-clone-referenced-element' +
      '|@react-native-community|expo(nent)?' +
      '|@expo(nent)?/.*' +
      '|react-navigation' +
      '|@react-navigation/.*' +
      '|@unimodules/.*' +
      '|sentry-expo' +
      '|native-base' +
      '|@expo-google-fonts' +
      '|react-native-vector-icons' +
      '|react-native-vector-icons/.*' +
      '|@expo/vector-icons' +
      '|@expo/vector-icons/.*' +
      ')',
  ],
  // projects: [
  //   {
  //     preset: 'jest-expo/ios',
  //     transformIgnorePatterns: [
  //       ...expoIosPreset.transformIgnorePatterns,
  //       'node_modules/(?!(jest-)?react-native|unimodules-permissions-interface|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base|@expo-google-fonts)',
  //     ],
  //   },
  //   {
  //     preset: 'jest-expo/android',
  //     transformIgnorePatterns: [
  //       'node_modules/(?!(jest-)?react-native|unimodules-permissions-interface|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|sentry-expo|native-base|@expo-google-fonts)',
  //     ],
  //   },
  // ],
});
