import Colors from '../constants/Colors';

export const getTheme = () => {
  const selected = 'brand';
  return Colors[selected];
};
