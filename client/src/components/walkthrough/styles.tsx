import { StyleSheet } from 'react-native';

import { getTheme } from '../../utils/theme';

const styles = (theme) =>
  StyleSheet.create({
    main: {
      justifyContent: 'flex-start',
      width: '100%',
      height: '100%',
      left: 0,
      backgroundColor: getTheme(theme).primary,
      padding: 20,
    },
    logo: {
      color: getTheme(theme).secondary,
      fill: getTheme(theme).secondary,
    },
    content: {
      height: '95%',
      display: 'flex',
    },
  });

export default styles;
