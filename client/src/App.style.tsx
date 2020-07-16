import { DefaultTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Colors from './constants/Colors';

export const styles = StyleSheet.create({
  tabs: {
    backgroundColor: Colors.brand.primary,
    shadowOpacity: 0,
  },
});

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.brand.primary,
  },
};
