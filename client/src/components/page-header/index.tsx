import React, { useContext } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import styles from './styles';
import { getStyles } from '../../utils/theme';
import Fonts from '../../constants/Fonts';
import { ThemeContext } from '../../App';

interface BoxProps {
  title: string;
  action?: {
    label: string;
    function: () => void;
  };
}

const PageHeader: React.FC<BoxProps> = ({ title, action }) => {
  const Styled = getStyles(styles);
  const themeContext = useContext(ThemeContext);

  return (
    <View style={Styled.main}>
      <Text style={Styled.headerText}>{title}</Text>
      {action && (
        <TouchableHighlight onPress={action.function}>
          <Text style={{ ...Fonts(themeContext).label, color: 'white' }}>{action.label}</Text>
        </TouchableHighlight>
      )}
    </View>
  );
};

export default PageHeader;
