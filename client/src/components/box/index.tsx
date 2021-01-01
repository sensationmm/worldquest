import classNames from 'classnames-react-native';
import React from 'react';
import { Image, Text, View } from 'react-native';

import Colors from '../../constants/Colors';
import onlyUnique from '../../utils/onlyUnique';
import Styled from './styles';

import { BoxProps, CoreBoxProps } from './box.types';

const Box: React.FC<BoxProps> = ({ children, title, icon, action, centered = false, isError = false }) => {
  const checkChildArray = Array.isArray(children) ? onlyUnique(children) : [];
  const isEmpty = !children || (checkChildArray.length === 1 && !checkChildArray[0]);

  return (
    <View
      style={classNames(Styled.main, centered && Styled.centered, isError && Styled.error, isEmpty && Styled.empty)}
    >
      {(title || icon) && (
        <View style={Styled.titleOuter}>
          <View style={classNames(Styled.title, action && Styled.titlePadded)}>
            {icon && <Image style={Styled.icon} accessibilityLabel={title} source={icon} />}
            {title && <Text style={Styled.titleText}>{title}</Text>}
          </View>
          {action && <View style={Styled.action}>{action}</View>}
        </View>
      )}
      {children}
    </View>
  );
};

export const ErrorBox: React.FC<CoreBoxProps> = ({ children }) => (
  <Box centered={true} isError={true}>
    {typeof children !== 'object' ? (
      <Text style={{ color: Colors.basic.white }}>{children}</Text>
    ) : (
      Object.keys(children).map((child, count) => (
        <Text key={`error-${count}`} style={{ color: Colors.basic.white }}>
          {children[child]}
        </Text>
      ))
    )}
  </Box>
);

export default Box;
