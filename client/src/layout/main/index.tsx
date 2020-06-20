import { FredokaOne_400Regular, useFonts } from '@expo-google-fonts/fredoka-one';
import { AppLoading } from 'expo';
import React from 'react';
import { Image, Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import Logo from '../../../assets/splash.png';

import Styled from './styles';

const Main = (props: any) => {
  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
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
  }
};

export default Main;
