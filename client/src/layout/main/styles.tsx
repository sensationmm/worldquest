import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import { getTheme } from '../../utils/theme';

export default StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor: getTheme().primary,
  },
  logo: {
    width: 100,
    height: 67,
    color: getTheme().secondary,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  body: {
    height: '83%',
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
  },
  pageHeading: {
    fontFamily: 'FredokaOne_400Regular',
    color: Colors.basic.white,
    fontSize: 24,
    textTransform: 'uppercase',
    paddingLeft: 10,
    marginBottom: 10,
  },
});
