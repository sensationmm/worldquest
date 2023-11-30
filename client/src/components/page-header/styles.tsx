import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const styles = (theme) =>
  StyleSheet.create({
    main: {
      marginBottom: 20,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    headerText: {
      color: Colors.basic.white,
      ...Fonts(theme).heading,
    },
  });

export default styles;
