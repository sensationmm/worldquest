import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { getTheme } from '../utils/theme';

import ProgressStyles from './Progress.styles';

const styles = (theme) =>
  StyleSheet.create({
    ...ProgressStyles,
    avatarContainer: {
      position: 'absolute',
      top: 15,
      right: 15,
      zIndex: 2,
    },
    clueSection: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    clueTokens: {
      width: 150,
      height: 150,
      borderRadius: 75,
      borderWidth: 10,
      borderColor: getTheme(theme).primary,
      borderStyle: 'solid',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buyButtons: {
      paddingLeft: 20,
    },
    buyButton: {
      marginBottom: 10,
    },
    themes: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: 20,
    },
    themeSwatch: {
      width: 80,
      height: 80,
      borderRadius: 40,
      padding: 5,
      position: 'relative',
    },
    themeCheckMark: {
      position: 'absolute',
      top: 20,
      left: 10,
      color: Colors.basic.error,
    },
  });

export default styles;
