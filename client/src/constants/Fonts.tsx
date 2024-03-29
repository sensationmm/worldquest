import { TextStyle } from 'react-native';
import { getTheme } from '../utils/theme';
import Colors from './Colors';

const Fredoka = {
  fontFamily: 'FredokaOne_400Regular',
  letterSpacing: 1,
  textTransform: 'uppercase',
} as TextStyle;

interface TextStyleExport {
  [key: string]: TextStyle;
}

const Fonts = (theme?) =>
  ({
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
      color: getTheme(theme).primary,
      fontWeight: 'bold',
    },
    inputDisabled: {
      color: Colors.basic.white,
    },
    label: {
      ...Fredoka,
      fontSize: 14,
    },
    riddle: {
      fontSize: 20,
    },
    guess: {
      ...Fredoka,
      fontSize: 30,
      textAlign: 'center',
      color: getTheme(theme).primary,
    },
    stat: {
      ...Fredoka,
      fontSize: 50,
      textAlign: 'center',
      color: getTheme(theme).primary,
    },
  } as TextStyleExport);

export default Fonts;
