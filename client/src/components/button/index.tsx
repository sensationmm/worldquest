import classNames from 'classnames-react-native';
import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import Fonts from '../../constants/Fonts';
import Styled from './styles';

interface ButtonProps {
  label: string;
  isPassword?: boolean;
  onClick: () => void;
  disabled?: boolean;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled = false, small = false }) => {
  return (
    <TouchableHighlight disabled={disabled} onPress={onClick} underlayColor={'transparent'} style={{ borderRadius: 20 }}>
      <View style={classNames(Styled.main, small && Styled.small, disabled && Styled.disabled)}>
        <Text style={classNames(Fonts.subHeading, Styled.buttonText, small && Styled.buttonTextSmall)}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default Button;
