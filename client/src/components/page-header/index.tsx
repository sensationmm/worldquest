import React from 'react';
import { Text, View } from 'react-native';

import styles from './styles';
import { getStyles } from '../../utils/theme';

interface BoxProps {
  title: string;
}

const PageHeader: React.FC<BoxProps> = ({ title }) => {
  const Styled = getStyles(styles);

  return (
    <View style={Styled.main}>
      <Text style={Styled.headerText}>{title}</Text>
    </View>
  );
};

export default PageHeader;
