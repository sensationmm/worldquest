import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import Logo from '../../assets/logo.svg';

import Styled from './styles';

const Main = (props: any) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={Styled.main}>
        <View style={Styled.header}>
          <Logo style={Styled.logo} />
        </View>
        <View style={Styled.body}>{props.children}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Main;
