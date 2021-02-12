import { TextStyle } from 'react-native';
import Colors from '../constants/Colors';

const base = {
  fontFamily: 'FredokaOne_400Regular',
  letterSpacing: 1,
  textTransform: 'uppercase',
} as TextStyle;

interface TextStyleExport {
  [key: string]: TextStyle;
}

export default {
  body: {
    fontSize: 16,
  },
  bodySmall: {
    fontSize: 12,
  },
  bold: {
    fontWeight: 'bold',
  },
  subHeading: {
    ...base,
    fontSize: 20,
  },
  heading: {
    ...base,
    fontSize: 24,
  },
  input: {
    fontSize: 20,
    color: Colors.brand.primary,
    fontWeight: 'bold',
  },
  label: {
    ...base,
    fontSize: 14,
  },
  riddle: {
    fontSize: 30,
  },
  guess: {
    ...base,
    fontSize: 30,
    color: Colors.brand.primary,
  },
} as TextStyleExport;
