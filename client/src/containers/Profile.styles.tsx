import { StyleSheet } from 'react-native';

import ProgressStyles from './Progress.styles';

export default StyleSheet.create({
  ...ProgressStyles,
  avatarContainer: {
    backgroundColor: 'red',
  },
  avatar: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
});
