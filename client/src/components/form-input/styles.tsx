import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

export default StyleSheet.create({
  main: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: Colors.basic.white,
    borderRadius: 20,
    padding: 20,
  },
  label: {
    ...Fonts.label,
    color: Colors.basic.white,
    marginBottom: 5,
    paddingLeft: 10,
  },
});
