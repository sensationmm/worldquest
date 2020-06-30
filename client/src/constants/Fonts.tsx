import Colors from '../constants/Colors';
import { TextStyle } from 'react-native';

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
} as TextStyleExport;
