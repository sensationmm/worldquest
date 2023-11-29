import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
import { getTheme } from '../../utils/theme';

const styles = (theme) =>
  StyleSheet.create({
    avatarContainer: {
      backgroundColor: Colors.basic.white,
      width: 80,
      height: 80,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      overflow: 'hidden',
      borderWidth: 5,
      borderColor: getTheme(theme).primary,
      borderStyle: 'solid',
    },
    avatar: {
      width: '100%',
      height: '100%',
    },
    avatarPlaceholder: {
      position: 'absolute',
      top: 5,
    },
  });

export default styles;
