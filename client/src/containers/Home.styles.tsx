import EStyleSheet from 'react-native-extended-stylesheet';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

export default EStyleSheet.create({
  hint: {
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: Colors.basic.border,
    borderStyle: 'solid',
    borderTopWidth: 1,
    textAlign: 'center',
  },
  'hint:last-child': {
    paddingBottom: 0,
  },
  newHintTitle: {
    ...Fonts.bodySmall,
  },
  hintUnavailable: {
    display: 'flex',
    paddingTop: 20,
    borderColor: Colors.basic.border,
    borderStyle: 'solid',
    borderTopWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
