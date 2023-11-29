import React from 'react';

import { Image, View } from 'react-native';
import styles from './styles';
import Icon, { IconSize } from '../icon';
import Colors from '../../constants/Colors';
import { getStyles } from '../../utils/theme';

type AvatarProps = {
  src: string;
};
const Avatar: React.FC<AvatarProps> = ({ src }) => {
  const Styled = getStyles(styles);

  return (
    <View style={Styled.avatarContainer}>
      {src !== '' ? (
        <Image style={Styled.avatar} source={{ uri: src }} />
      ) : (
        <View style={Styled.avatarPlaceholder}>
          <Icon name='user' size={IconSize.LARGE} color={Colors.basic.border} />
        </View>
      )}
    </View>
  );
};

export default Avatar;
