import React from 'react';
import { Text, View } from 'react-native';

import Styled from './styles';

interface BoxProps {
  title: string;
}

const PageHeader: React.FC<BoxProps> = ({ title }) => {
  return (
    <View style={Styled.main}>
      <Text style={Styled.headerText}>{title}</Text>
    </View>
  );
};

export default PageHeader;
