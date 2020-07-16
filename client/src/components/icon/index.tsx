import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

import Colors from '../../constants/Colors';

interface IconProps {
  name: string;
  focused?: boolean;
  large?: boolean;
}

const Icon: React.FC<IconProps> = ({ name, focused = false, large = false }) => {
  const color = focused ? Colors.basic.white : Colors.brand.secondary;
  const size = large ? 50 : 24;
  const margin = large ? 0 : 26;

  return (
    <FontAwesome5
      name={name}
      size={size}
      color={color}
      style={{
        marginTop: margin,
        height: size,
        width: size + 6,
        textAlign: 'center',
      }}
      solid
    />
  );
};

export default Icon;
