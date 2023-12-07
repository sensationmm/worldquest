import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { getTheme } from '../../utils/theme';

const styles = (theme) =>
  StyleSheet.create({
    main: {
      marginBottom: 20,
    },
    disabled: {
      backgroundColor: getTheme(theme).primary,
    },
    input: {
      backgroundColor: Colors.basic.white,
      borderRadius: 20,
      padding: 20,
      borderStyle: 'solid',
      borderWidth: 1,
    },
    label: {
      ...Fonts(theme).label,
      color: Colors.basic.white,
      marginBottom: 5,
      paddingLeft: 10,
    },
  });

export default styles;
