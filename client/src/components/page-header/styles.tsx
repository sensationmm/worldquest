import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const styles = (theme) =>
  StyleSheet.create({
    main: {
      marginBottom: 20,
    },
    headerText: {
      color: Colors.basic.white,
      ...Fonts(theme).heading,
    },
  });

export default styles;
