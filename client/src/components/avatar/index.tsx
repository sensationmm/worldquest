import React from 'react';

import { Image, View } from 'react-native';
import styles from './styles';
import Icon, { IconSize } from '../icon';
import Colors from '../../constants/Colors';
import { getStyles } from '../../utils/theme';

type AvatarProps = {
  src: string;
  size?: 'small' | 'medium' | 'large';
  children?: JSX.Element;
};
const Avatar: React.FC<AvatarProps> = ({ src, size = 'small', children }) => {
  const Styled = getStyles(styles);

  return (
    <View>
      <View style={{ ...Styled.avatarContainer, ...Styled[`size${size}`] }}>
        {src && src !== '' ? (
          <Image style={Styled.avatar} source={{ uri: src }} />
        ) : (
          <View style={Styled.avatarPlaceholder}>
            <Icon name='user' size={IconSize.LARGE} color={Colors.basic.border} />
          </View>
        )}
        {children && <View style={Styled.overlay}>{children}</View>}
      </View>
    </View>
  );
};

export default Avatar;
