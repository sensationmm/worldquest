import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

export default StyleSheet.create({
  main: {
    marginBottom: 20,
  },
  headerText: {
    color: Colors.basic.white,
    ...Fonts.heading,
  },
});
