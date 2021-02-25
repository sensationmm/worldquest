import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

import accountService from '../services/AccountService';
import { User } from '../types/User.types';

import { ScreenProps } from '../App';
import Box from '../components/box';
import Button from '../components/button';
import PageHeader from '../components/page-header';
import Fonts from '../constants/Fonts';
import { formatDate } from '../utils/date';

import Styled from './Profile.styles';

const Profile: React.FC<ScreenProps> = ({ setIsLoading, setIsLoggedIn }) => {
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
    if (!currentUser) {
      getCurrentUser();
    }
  }, []);

  const onLogout = async () => {
    setIsLoading(true);
    setIsLoggedIn(false);
    setIsLoading(false);

    await SecureStore.deleteItemAsync('jwt_token');
  };

  const buyTokens = async (num: string) => {
    const numClues = parseInt(num, 10);
    setIsLoading(true);
    await AccountService.buyClues(numClues).then(() => {
      setCurrentUser({
        ...currentUser,
        clueTokens: currentUser?.clueTokens + numClues,
      });
      setIsLoading(false);
    });
  };

  return (
    <View>
      <PageHeader title={'My Profile'} />

      <Box title={'Personal Details'}>
      {currentUser && (
          <>
        <View style={Styled.avatarContainer}>
              <Image style={Styled.avatar} source={{ uri: `https:${currentUser?.avatar}` }} />
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
              <View style={Styled.section}>
                <Text style={Fonts.bold}>Last played: </Text>
                <Text>{formatDate(currentUser?.lastPlayedAt)}</Text>
              </View>
            </View>
          </>
        )}
      </Box>

      <Box title={'Clue Tokens'}>
        <View style={Styled.summary}>
          <View style={Styled.clueTokens}>
            <Text style={Fonts.subHeading}>Owned</Text>
            <Text style={Fonts.guess}>{currentUser?.clueTokens}</Text>
          </View>

          <View style={Styled.buyButtons}>
            {['1', '5', '10'].map((item) => (
              <View style={Styled.buyButton}>
                <Button key={`buy-${item}`} small onClick={() => buyTokens(item)} label={`Buy ${item} for £0`} />
              </View>
            ))}
          </View>
        </View>
      </Box>

      <Button onClick={onLogout} label={'Log Out'} />
    </View>
  );
};

export default Profile;
