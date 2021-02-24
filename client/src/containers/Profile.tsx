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

  console.log('currentUser', currentUser);

  return (
    <View>
      <PageHeader title={'My Profile'} />

      {currentUser && (
        <View style={Styled.avatarContainer}>
          <Image style={Styled.avatar} source={{ uri: currentUser?.avatar }} />
        </View>
      )}

      <Box title={'Personal Details'}>
        <View style={Styled.section}>
          <Text style={Fonts.bold}>Name: </Text>
          <Text>{currentUser?.name}</Text>
        </View>
        <View style={Styled.section}>
          <Text style={Fonts.bold}>Email: </Text>
          <Text>{currentUser?.email}</Text>
        </View>
      </Box>

      <Button onClick={onLogout} label={'Log Out'} />
    </View>
  );
};

export default Profile;
