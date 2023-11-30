import classNames from 'classnames-react-native';
import React, { useContext } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import Fonts from '../../constants/Fonts';
import styles from './styles';
import { getStyles } from '../../utils/theme';
import { ThemeContext } from '../../App';

interface ButtonProps {
  type?: 'primary' | 'secondary';
  label: string;
  isPassword?: boolean;
  onClick: () => void;
  disabled?: boolean;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({ type = 'primary', label, onClick, disabled = false, small = false }) => {
  const Styled = getStyles(styles);
  const themeContext = useContext(ThemeContext);

  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={onClick}
      underlayColor={'transparent'}
      style={{ borderRadius: 20 }}
    >
      <View
        style={classNames(
          Styled.main,
          type === 'primary' ? Styled.primary : Styled.secondary,
          small && Styled.small,
          disabled && Styled.disabled
        )}
      >
        <Text style={classNames(Fonts(themeContext).subHeading, Styled.buttonText, small && Styled.buttonTextSmall)}>
          {label}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default Button;
