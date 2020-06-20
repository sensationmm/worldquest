import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import Styled from './styles';

interface FormInputProps {
  label: string;
  isPassword?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<FormInputProps> = ({ label, onClick, disabled = false }) => {
  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onClick}
      underlayColor={Colors.basic.white}
      style={{ borderRadius: 20 }}
    >
      <View style={Styled.main}>
        <Text style={{ ...Fonts.subHeading, ...Styled.buttonText }}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default Button;
