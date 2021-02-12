import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  accordion: {
    height: 0,
    overflow: 'hidden',
  },
  open: {
    height: 'auto',
  },
  expander: {
    width: 40,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: 0,
  },
  titleOuter: {
    marginBottom: 0,
  },
});
