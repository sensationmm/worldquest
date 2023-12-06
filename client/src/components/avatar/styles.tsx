import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { getTheme } from '../../utils/theme';

const styles = (theme) =>
  StyleSheet.create({
    avatarContainer: {
      position: 'relative',
      backgroundColor: Colors.basic.white,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 80,
      overflow: 'hidden',
      borderColor: getTheme(theme).secondary,
      borderStyle: 'solid',
      zIndex: 1,
    },
    sizetiny: {
      width: 50,
      height: 50,
      borderWidth: 3,
    },
    sizesmall: {
      width: 80,
      height: 80,
      borderWidth: 3,
    },
    sizemedium: {
      width: 100,
      height: 100,
      borderWidth: 5,
    },
    sizelarge: {
      width: 160,
      height: 160,
      borderWidth: 5,
    },
    avatar: {
      width: '100%',
      height: '100%',
    },
    avatarPlaceholder: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
  });

export default styles;
