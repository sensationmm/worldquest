import React from 'react';

import { Image, ImageSourcePropType, View } from 'react-native';
import styles from './styles';
import Icon, { IconSize } from '../icon';
import Colors from '../../constants/Colors';
import { getStyles } from '../../utils/theme';

import AvatarDog from '../../assets/avatars/dog.jpg';
import AvatarCat from '../../assets/avatars/cat.jpg';
import AvatarLion from '../../assets/avatars/lion.jpg';
import AvatarFox from '../../assets/avatars/fox.jpg';
import AvatarTiger from '../../assets/avatars/tiger.jpg';
import AvatarGorilla from '../../assets/avatars/gorilla.jpg';
import AvatarRabbit from '../../assets/avatars/rabbit.jpg';
import AvatarKoala from '../../assets/avatars/koala.jpg';

export enum AvatarPlaceholder {
  'wq-dog' = AvatarDog,
  'wq-cat' = AvatarCat,
  'wq-lion' = AvatarLion,
  'wq-fox' = AvatarFox,
  'wq-tiger' = AvatarTiger,
  'wq-gorilla' = AvatarGorilla,
  'wq-rabbit' = AvatarRabbit,
  'wq-koala' = AvatarKoala,
}

type AvatarProps = {
  src: string | AvatarPlaceholder;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  children?: JSX.Element;
};
const Avatar: React.FC<AvatarProps> = ({ src, size = 'small', children }) => {
  const Styled = getStyles(styles);

  return (
    <View>
      <View style={{ ...Styled.avatarContainer, ...Styled[`size${size}`] }}>
        {src && src !== '' ? (
          <Image
            style={Styled.avatar}
            source={src.toString().substring(0, 3) !== 'wq-' ? { uri: src } : AvatarPlaceholder[src]}
          />
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
