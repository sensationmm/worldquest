import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { getTheme } from '../utils/theme';

import ProgressStyles from './Progress.styles';

const styles = (theme) =>
  StyleSheet.create({
    ...ProgressStyles,
    avatarContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 2,
    },
    avatarEditContainer: {
      display: 'flex',
      marginBottom: 20,
      flexDirection: 'row',
    },
    avatarEditOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 6,
      paddingTop: 6,
    },
    avatarPlaceholders: {
      display: 'flex',
      flex: 5,
      marginHorizontal: 5,
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
    uploadImageTrigger: {
      position: 'relative',
      backgroundColor: getTheme(theme).secondary,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 80,
      overflow: 'hidden',
      borderColor: getTheme(theme).secondary,
      borderStyle: 'solid',
      zIndex: 1,
      width: 50,
      height: 50,
      borderWidth: 3,
    },
  });

export default styles;
