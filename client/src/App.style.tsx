import { DefaultTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { getTheme } from './utils/theme';

export const styles = (theme) =>
  StyleSheet.create({
    tabs: {
      backgroundColor: getTheme(theme).primary,
      shadowOpacity: 0,
    },
    main: {
      flex: 1,
      height: '100%',
      backgroundColor: getTheme(theme).primary,
    },
  });

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
    secondaryContainer: 'transparent',
  },
};
