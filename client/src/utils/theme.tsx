import { useContext } from 'react';
import Colors from '../constants/Colors';
import { Theme } from '../types/User.types';
import { ThemeContext } from '../App';

export const getTheme = (selected: Theme = 'brand') => {
  return Colors[selected];
};

export function getStyles(styles: any) {
  const theme = useContext(ThemeContext);
  const stylesObject = styles(theme);

  return stylesObject;
}
