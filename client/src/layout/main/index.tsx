import React from 'react';
import { Keyboard, SafeAreaView, ScrollView, TouchableWithoutFeedback, View } from 'react-native';

import Logo from '../../assets/logo.svg';

import Styled from './styles';
import SvgComponent from '../../components/svg';

const Main = (props: any) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={Styled.main}>
        <View style={Styled.header}>
          {/* <Logo style={Styled.logo} /> */}
          <SvgComponent svg={Logo} style={Styled.logo} />
        </View>
        <View style={Styled.body} onStartShouldSetResponder={() => true}>
          {/* <ScrollView style={{ flexGrow: 1 }}> */}
          {props.children}
          {/* </ScrollView> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Main;
