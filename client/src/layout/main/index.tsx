import React from 'react';
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from 'react-native';

import Logo from '../../assets/logo.svg';

import Styled from './styles';
import SvgComponent from '../../components/svg';

const Main = (props: any) => {
  return (
    <View style={Styled.main}>
      <View style={Styled.header}>
        {/* <Logo style={Styled.logo} /> */}
        <SvgComponent svg={Logo} style={Styled.logo} />
      </View>
      <View style={Styled.body}>{props.children}</View>
    </View>
  );
};

export default Main;
