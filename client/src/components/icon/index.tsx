import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

import Colors from '../../constants/Colors';
import { getTheme } from '../../utils/theme';

enum IconSize {
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

const Icon: React.FC<IconProps> = ({ name, focused = false, size = 'small', color = getTheme().secondary }) => {
  const iconColor = focused ? Colors.basic.white : color;
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
