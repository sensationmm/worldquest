import { TextStyle } from 'react-native';
import Colors from '../constants/Colors';

const Fredoka = {
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
    ...Fredoka,
    fontSize: 20,
  },
  heading: {
    ...Fredoka,
    fontSize: 24,
  },
  input: {
    fontSize: 20,
    color: Colors.brand.primary,
    fontWeight: 'bold',
  },
  label: {
    ...Fredoka,
    fontSize: 14,
  },
  riddle: {
    fontSize: 30,
  },
  guess: {
    ...Fredoka,
    fontSize: 30,
    textAlign: 'center',
    color: Colors.brand.primary,
  },
} as TextStyleExport;
