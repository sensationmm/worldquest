import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import '../utils/chunk';

import accountService from '../services/AccountService';
import { User } from '../types/User.types';

import { FunctionalScreenProps } from '../App';
import Logo from '../assets/logo.svg';
import Box from '../components/box';
import Button from '../components/button';
import Icon, { IconSize } from '../components/icon';
import PageHeader from '../components/page-header';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Tokens from '../constants/Tokens';
import { formatDate } from '../utils/date';

import { getTheme } from '../utils/theme';
import Styled from './Profile.styles';
import SvgComponent from '../components/svg';

const Profile: React.FC<FunctionalScreenProps> = ({ setIsLoading, setIsLoggedIn, refetchData, setRefetchData }) => {
  const AccountService = new accountService();
  const [currentUser, setCurrentUser] = useState<User>();

  const getCurrentUser = async () => {
    setIsLoading(true);
    await AccountService.current().then((res) => {
      setCurrentUser(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (!currentUser || refetchData) {
      getCurrentUser();
      setRefetchData(false);
    }
  }, []);

  const onLogout = async () => {
    setIsLoading(true);
    setIsLoggedIn(false);
    setIsLoading(false);

    await SecureStore.deleteItemAsync('jwt_token');
  };

  const buyTokens = async (numClues: number) => {
    setIsLoading(true);
    if (currentUser) {
      await AccountService.buyClues(numClues).then(() => {
        setCurrentUser({
          ...currentUser,
          clueTokens: currentUser.clueTokens + numClues,
        });
        setIsLoading(false);
      });
    }
  };

  return (
    <View>
      <PageHeader title={'My Profile!'} />

      <Box title={'Personal Details'}>
        {currentUser && (
          <>
            <View style={Styled.avatarContainer}>
              <Image style={Styled.avatar} source={{ uri: currentUser.avatar }} />
            </View>
            <View>
              <View style={Styled.section}>
                <Text style={Fonts.bold}>Name: </Text>
                <Text>{currentUser?.name}</Text>
              </View>
              <View style={Styled.section}>
                <Text style={Fonts.bold}>Email: </Text>
                <Text>{currentUser?.email}</Text>
              </View>
              <View style={Styled.section}>
                <Text style={Fonts.bold}>Member since: </Text>
                <Text>{formatDate(currentUser?.createdAt)}</Text>
              </View>
              {currentUser?.lastPlayedAt && (
                <View style={Styled.section}>
                  <Text style={Fonts.bold}>Last played: </Text>
                  <Text>{formatDate(currentUser?.lastPlayedAt)}</Text>
                </View>
              )}
            </View>
          </>
        )}
      </Box>

      <Box title={'Clue Tokens'}>
        <View style={Styled.summary}>
          <View style={Styled.clueTokens}>
            <Text style={Fonts.stat}>{currentUser?.clueTokens}</Text>
            <Text style={Fonts.subHeading}>Left</Text>
          </View>

          <View style={Styled.buyButtons}>
            {Tokens.map(({ num, cost }) => (
              <View key={`buy-${num}`} style={Styled.buyButton}>
                <Button small onClick={() => buyTokens(num)} label={`Buy ${num} for £${cost}`} />
              </View>
            ))}
          </View>
        </View>
      </Box>

      <Box title={'Choose Theme'}>
        <View>
          {Object.keys(Colors)
            .filter((key) => key.substr(0, 5) === 'brand')
            .chunk(3)
            .map((chunk: string[], countChunk: number) => {
              return (
                <View key={`chunk-${countChunk}`} style={Styled.themes}>
                  {chunk.map((item: string, count: number) => {
                    const theme = Colors[item];
                    return (
                      <View
                        key={`swatch-${countChunk}-${count}`}
                        style={{ ...Styled.themeSwatch, backgroundColor: theme.primary }}
                      >
                        <SvgComponent svg={Logo} style={{ color: theme.secondary }} />
                        {getTheme() === theme && (
                          <View style={Styled.themeCheckMark}>
                            <Icon name={'check'} size={IconSize.MEDIUM} color={Colors.basic.black} />
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              );
            })}
        </View>
      </Box>

      <Button onClick={onLogout} label={'Log Out'} />
    </View>
  );
};

export default Profile;
