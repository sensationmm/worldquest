import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

export default StyleSheet.create({
  main: {
    backgroundColor: Colors.brand.secondary,
    borderRadius: 20,
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.basic.white,
  },
  buttonTextSmall: {
    ...Fonts.bodySmall,
  },
  small: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: 'auto',
  },
  disabled: {
    opacity: 0.2,
  },
});
