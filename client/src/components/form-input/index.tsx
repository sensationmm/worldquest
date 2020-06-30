import React from 'react';
import { Text, TextInput, View } from 'react-native';

import Fonts from '../../constants/Fonts';

import Styled from './styles';

interface FormInputProps {
  label: string;
  value: string;
  isPassword?: boolean;
  onChange: (val: string) => void;
}

const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, isPassword = false }) => {
  return (
    <View style={Styled.main}>
      <Text style={Styled.label}>{label}</Text>
      <View style={Styled.input}>
        <TextInput
          style={Fonts.input}
          value={value}
          secureTextEntry={isPassword}
          onChangeText={onChange}
          autoCapitalize={'none'}
        />
      </View>
    </View>
  );
};

export default FormInput;
