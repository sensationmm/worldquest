import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { getTheme } from '../../utils/theme';

const styles = (theme) =>
  StyleSheet.create({
    main: {
      borderRadius: 20,
      padding: 20,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    primary: {
      backgroundColor: getTheme(theme).secondary,
    },
    secondary: {
      backgroundColor: getTheme(theme).tertiary,
    },
    buttonText: {
      color: Colors.basic.white,
    },
    buttonTextSmall: {
      ...Fonts(theme).bodySmall,
    },
    small: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      width: 'auto',
      marginBottom: 0,
    },
    disabled: {
      opacity: 0.2,
    },
  });

export default styles;
