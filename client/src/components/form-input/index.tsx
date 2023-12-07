import React, { useContext } from 'react';
import { Text, TextInput, View } from 'react-native';

import Fonts from '../../constants/Fonts';

import styles from './styles';
import { getStyles } from '../../utils/theme';
import { ThemeContext } from '../../App';

interface FormInputProps {
  label: string;
  value: string;
  placeholder?: string;
  isPassword?: boolean;
  onChange: (val: string) => void;
  disabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  isPassword = false,
  disabled = false,
}) => {
  const Styled = getStyles(styles);
  const theme = useContext(ThemeContext);

  return (
    <View style={Styled.main}>
      <Text style={Styled.label}>{label}</Text>
      <View style={[Styled.input, disabled && Styled.disabled]}>
        <TextInput
          style={[Fonts(theme).input, disabled && Fonts(theme).inputDisabled]}
          value={value}
          placeholder={placeholder}
          secureTextEntry={isPassword}
          onChangeText={onChange}
          autoCapitalize={'none'}
          editable={!disabled}
          selectTextOnFocus={!disabled}
        />
      </View>
    </View>
  );
};

export default FormInput;
