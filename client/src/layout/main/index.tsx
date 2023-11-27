import React from 'react';
import { View } from 'react-native';

import Logo from '../../assets/logo.svg';

import Styled from './styles';
import SvgComponent from '../../components/svg';

const Main = (props: any) => {
  return (
    <View style={Styled.main}>
      <View style={Styled.header}>
        <SvgComponent svg={Logo} style={Styled.logo} />
      </View>
      <View style={Styled.body}>{props.children}</View>
    </View>
  );
};

export default Main;
