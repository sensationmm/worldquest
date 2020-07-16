import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

export default StyleSheet.create({
  main: {
    backgroundColor: Colors.basic.white,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    ...Fonts.subHeading,
  },
  icon: {
    maxWidth: 30,
    maxHeight: 30,
    marginRight: 10,
  },
  centered: {
    alignItems: 'center',
  },
});
