import { DefaultTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { getTheme } from './utils/theme';

export const styles = StyleSheet.create({
  tabs: {
    backgroundColor: getTheme().primary,
    shadowOpacity: 0,
  },
  main: {
    flex: 1,
    height: '100%',
    backgroundColor: getTheme().primary,
  },
});

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: getTheme().primary,
  },
};
