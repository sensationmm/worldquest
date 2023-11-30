import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const styles = (theme) =>
  StyleSheet.create({
    main: {
      marginBottom: 20,
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
