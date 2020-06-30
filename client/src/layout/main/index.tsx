import React from 'react';
import { Image, Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import Logo from '../../assets/logo.png';

import Styled from './styles';

const Main = (props: any) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={Styled.main}>
        <View style={Styled.header}>
          <Image source={Logo} style={Styled.logo} />
        </View>
        <View style={Styled.body}>{props.children}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Main;
