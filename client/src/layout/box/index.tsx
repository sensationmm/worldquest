import classNames from 'classnames-react-native';
import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';

import Styled from './styles';

interface BoxProps {
  children: any;
  centered?: boolean;
  title?: string;
  icon?: ImageSourcePropType;
}

const Box: React.FC<BoxProps> = ({ children, title, icon, centered = false }) => {
  return (
    <View style={classNames(Styled.main, centered && Styled.centered)}>
      {(title || icon) && (
        <View style={Styled.title}>
          {icon && <Image style={Styled.icon} accessibilityLabel={title} source={icon} />}
          <Text style={Styled.titleText}>{title}</Text>
        </View>
      )}
      {children}
    </View>
  );
};

export default Box;
