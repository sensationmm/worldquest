import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

export default StyleSheet.create({
  main: {
    position: 'relative',
    backgroundColor: Colors.basic.white,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    marginBottom: 20,
  },
  error: {
    padding: 10,
    backgroundColor: Colors.basic.error,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexShrink: 1,
  },
  titlePadded: {
    paddingRight: 20,
  },
  titleText: {
    ...Fonts.subHeading,
  },
  titleOuter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  },
  titleMargined: {
    marginBottom: 20,
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    maxWidth: 30,
    maxHeight: 30,
    marginRight: 10,
  },
  centered: {
    alignItems: 'center',
  },
  empty: {
    paddingBottom: 0,
  },
});
