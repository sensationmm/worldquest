import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

export default StyleSheet.create({
  section: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: Colors.basic.border,
    display: 'flex',
    flexDirection: 'row',
  },
});
