import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Text, View } from 'react-native';

import Button from '../components/button';

import { ScreenProps } from '../App';

const Profile: React.FC<ScreenProps> = ({ setIsLoading, setIsLoggedIn }) => {
  const onLogout = async () => {
    setIsLoading(true);
    setIsLoggedIn(false);
    setIsLoading(false);

    await SecureStore.deleteItemAsync('jwt_token');
  };

  return (
    <View>
      <Text>Profile</Text>

      <Button onClick={onLogout} label={'Log Out'} />
    </View>
  );
};

export default Profile;
