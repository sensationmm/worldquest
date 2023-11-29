import React from 'react';
import { View } from 'react-native';

import Logo from '../../assets/logo.svg';

import styles from './styles';
import SvgComponent from '../../components/svg';
import { getStyles } from '../../utils/theme';

const Main = (props: any) => {
  const Styled = getStyles(styles);

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
