import { FontAwesome5 } from '@expo/vector-icons';
import React, { useContext } from 'react';

import Colors from '../../constants/Colors';
import { getTheme } from '../../utils/theme';
import { ThemeContext } from '../../App';
import { Theme } from '../../types/User.types';

export enum IconSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface IconProps {
  name: string;
  focused?: boolean;
  color?: string;
  size?: IconSize;
}

const Icon: React.FC<IconProps> = ({ name, focused = false, size = 'small', color }) => {
  const theme = useContext(ThemeContext);
  const iconColor = focused ? Colors.basic.white : color ? color : getTheme(theme as Theme).secondary;
  let iconSize;
  let iconMargin;

  switch (size) {
    case IconSize.LARGE:
      iconSize = 75;
      break;
    case IconSize.MEDIUM:
      iconSize = 50;
      iconMargin = 0;
      break;
    case IconSize.SMALL:
    default:
      iconSize = 24;
      iconMargin = 13;
      break;
  }

  return (
    <FontAwesome5
      name={name}
      size={iconSize}
      color={iconColor}
      style={{
        marginTop: iconMargin,
        marginBottom: iconMargin,
        height: iconSize,
        width: iconSize + 6,
        textAlign: 'center',
      }}
      solid
    />
  );
};

export default Icon;
