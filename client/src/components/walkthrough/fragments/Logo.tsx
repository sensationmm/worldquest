import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import SvgComponent from '../../svg';
import { getStyles } from '../../../utils/theme';
import styles from '../styles';

const Logo: React.FC = () => {
  const Styled = getStyles(styles);
  const fadeAnim = new Animated.Value(0); // Initial value for opacity: 0
  const position = new Animated.Value(0); // Initial value for position: 0
  const size = new Animated.Value(1);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(position, {
          toValue: -280,
          useNativeDriver: true,
        }),
        Animated.spring(size, {
          toValue: 0.5,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View // Special animatable View
      style={{
        opacity: fadeAnim, // Bind opacity to animated value
        transform: [{ translateY: position }, { scale: size }],
      }}
    >
      <SvgComponent style={Styled.logo} />
    </Animated.View>
  );
};

export default Logo;
