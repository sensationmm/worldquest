import React from 'react';
import { Keyboard, SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';

import Logo from '../../assets/logo.svg';

import Styled from './styles';
import SvgComponent from '../../components/svg';

const Main = (props: any) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={Styled.main}>
        <View style={Styled.header}>
          {/* <Logo style={Styled.logo} /> */}
          <SvgComponent svg={Logo} style={Styled.logo} />
        </View>
        <View style={Styled.body} onStartShouldSetResponder={() => true}>
          {props.children}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Main;
