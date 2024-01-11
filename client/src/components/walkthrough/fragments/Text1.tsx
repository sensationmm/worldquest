import React, { useRef, useEffect } from 'react';
import { Animated, Text } from 'react-native';
import SvgComponent from '../../svg';
import { getStyles } from '../../../utils/theme';
import styles from '../styles';
import Fonts from '../../../constants/Fonts';

const Text1: React.FC = () => {
  const Styled = getStyles(styles);
  const fadeAnim = new Animated.Value(0); // Initial value for opacity: 0
  const positionY = new Animated.Value(0); // Initial value for position: 0
  const size = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.delay(1500),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(positionY, {
          toValue: -350,
          useNativeDriver: true,
        }),
        Animated.spring(size, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
      // Animated.delay(300),
      Animated.parallel([
        Animated.spring(size, {
          toValue: 0.5,
          useNativeDriver: true,
          speed: 1,
        }),
        Animated.spring(positionY, {
          toValue: -500,
          useNativeDriver: true,
          speed: 1,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim, // Bind opacity to animated value
        transform: [{ translateY: positionY }, { scale: size }],
      }}
    >
      <Text style={{ ...Fonts('brand').heading, textAlign: 'center' }}>
        Solve
        {'\n'}
        challenging
        {'\n'}
        riddles
      </Text>
    </Animated.View>
  );
};

export default Text1;
