import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import ProgressStyles from './Progress.styles';
import { getTheme } from '../utils/theme';

const styles = (theme) =>
  StyleSheet.create({
    ...ProgressStyles,
    bar: {
      backgroundColor: getTheme(theme).primary,
      borderLeftWidth: 1,
      borderStyle: 'solid',
      borderColor: 'white',
    },
    graph: {
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: Colors.basic.shadow,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
      height: 120,
    },
    graphLabels: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 5,
    },
    leaderContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    leaderText: {
      display: 'flex',
      justifyContent: 'center',
      paddingLeft: 15,
    },
  });

export default styles;
