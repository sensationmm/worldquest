import * as SecureStore from 'expo-secure-store';
import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import '../utils/chunk';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import accountService from '../services/AccountService';
import { Theme, User } from '../types/User.types';

import { FunctionalScreenProps, ThemeContext } from '../App';
import Logo from '../assets/logo.svg';
import Box, { ErrorBox } from '../components/box';
import Button from '../components/button';
import Icon, { IconSize } from '../components/icon';
import PageHeader from '../components/page-header';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Tokens from '../constants/Tokens';
import { formatDate } from '../utils/date';

import { getStyles } from '../utils/theme';
import styles from './Profile.styles';
import SvgComponent from '../components/svg';
import Avatar from '../components/avatar';
import FormInput from '../components/form-input';

type FileUploadBlob = {
  name: String;
  uri: String;
  type: String;
};

const Profile: React.FC<FunctionalScreenProps> = ({
  setIsLoading,
  setIsLoggedIn,
  refetchData,
  setRefetchData,
  setTheme,
}) => {
  const Styled = getStyles(styles);
  const AccountService = new accountService();
  const [currentUser, setCurrentUser] = useState<User>();
  const [userAvatar, setUserAvatar] = useState<string>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editValues, setEditValues] = useState({ name: '', email: '', avatar: '' });
  const [error, setError] = useState(undefined);

  const themeContext = useContext(ThemeContext);

  const getCurrentUser = async () => {
    setIsLoading(true);
    await AccountService.current().then(async (res) => {
      if (res.status === 200) {
        setCurrentUser({ ...res.data });
        setEditValues({
          ...editValues,
          name: res.data.name,
          email: res.data.email,
        });

        if (res.data.avatar !== '') {
          await AccountService.getAvatar(res.data.avatar).then(async (res2) => {
            if (res2.status === 200) {
              setUserAvatar(URL.createObjectURL(res2.data));
              setIsLoading(false);
            }
          });
        }
      } else {
        setIsLoggedIn(false);
        await SecureStore.deleteItemAsync('jwt_token');
        setIsLoading(false);
      }
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

  const createFormData = (uri) => {
    const fileName = uri.split('/').pop();
    const fileType = fileName.split('.').pop();
    const formData = new FormData();
    formData.append('image', {
      name: fileName,
      uri,
      type: `image/${fileType}`,
    });
    return formData;
  };

  const editDetails = async () => {
    setIsLoading(true);

    if (currentUser) {
      let editAvatar = undefined;

      if (editValues.avatar != '') {
        const resizedAvatar = await ImageManipulator.manipulateAsync(editValues.avatar, [{ resize: { width: 120 } }], {
          compress: 0.7,
          format: 'jpeg' as ImageManipulator.SaveFormat,
        });

        const avatar = await AccountService.editAvatar(createFormData(resizedAvatar.uri));
        editAvatar = avatar.data.imageName;
      }

      AccountService.editDetails(editValues.name, editValues.email, editAvatar || currentUser.avatar).then(
        (response) => {
          if (response.status === 200) {
            setError(undefined);
            setCurrentUser({
              ...currentUser,
              name: response.data.name,
              email: response.data.email,
              avatar: response.data.avatar,
            });
            setIsEdit(false);
            getCurrentUser();
          } else {
            setError(response.msg);
            setIsLoading(false);
          }
        }
      );
    }
  };

  const saveTheme = async (theme: Theme) => {
    setIsLoading(true);
    if (currentUser) {
      AccountService.saveTheme(theme).then((response) => {
        setCurrentUser({
          ...currentUser,
          theme: response.data.theme,
        });
        setTheme(response.data.theme);
        setIsLoading(false);
      });
    }
  };

  const onType = (val: string, key: string) => {
    setEditValues({
      ...editValues,
      [key]: val,
    });
  };

  const pickImageAsync = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          quality: 1,
        });
        if (!result.canceled) {
          setEditValues({
            ...editValues,
            avatar: result.assets[0].uri,
          });
        }
      }
    } catch (error) {
      console.log('catch', error);
    }
  };

  const validateEdit = editValues.name !== '' && editValues.email !== '';

  return (
    <View>
      <PageHeader
        title={!isEdit ? 'My Profile' : 'Edit My Profile'}
        action={!isEdit && { label: 'Edit Details', function: () => setIsEdit(true) }}
      />

      {!isEdit ? (
        <>
          <Box title={'Personal Details'}>
            {currentUser && (
              <>
                <View style={Styled.avatarContainer}>
                  <Avatar src={userAvatar} size='medium' />
                </View>
                <View>
                  <View style={Styled.section}>
                    <Text style={Fonts(themeContext).bold}>Name: </Text>
                    <Text>{currentUser?.name}</Text>
                  </View>
                  <View style={Styled.section}>
                    <Text style={Fonts(themeContext).bold}>Email: </Text>
                    <Text>{currentUser?.email}</Text>
                  </View>
                  <View style={Styled.section}>
                    <Text style={Fonts(themeContext).bold}>Member since: </Text>
                    <Text>{formatDate(currentUser?.createdAt)}</Text>
                  </View>
                  {currentUser?.lastPlayedAt && (
                    <View style={Styled.section}>
                      <Text style={Fonts(themeContext).bold}>Last played: </Text>
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
                <Text style={Fonts(themeContext).stat}>{currentUser?.clueTokens}</Text>
                <Text style={Fonts(themeContext).label}>Remaining</Text>
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
                          <TouchableHighlight
                            key={`swatch-${countChunk}-${count}`}
                            style={{ ...Styled.themeSwatch, backgroundColor: theme.primary }}
                            onPress={() => saveTheme(item as Theme)}
                          >
                            <>
                              <SvgComponent svg={Logo} style={{ color: theme.secondary }} />
                              {themeContext === item && (
                                <View style={Styled.themeCheckMark}>
                                  <Icon name={'check'} size={IconSize.MEDIUM} color={Colors.basic.black} />
                                </View>
                              )}
                            </>
                          </TouchableHighlight>
                        );
                      })}
                    </View>
                  );
                })}
            </View>
          </Box>

          <Button onClick={onLogout} label={'Log Out'} />
        </>
      ) : (
        <>
          {error && <ErrorBox>{error}</ErrorBox>}
          <View style={Styled.avatarEditContainer}>
            <TouchableOpacity onPress={pickImageAsync}>
              <Avatar src={editValues.avatar || userAvatar} size='large' />
            </TouchableOpacity>
          </View>
          <FormInput label={'Name'} value={editValues?.name} onChange={(val: string) => onType(val, 'name')} />
          <FormInput
            label={'Email Address'}
            value={editValues?.email}
            onChange={(val: string) => onType(val, 'email')}
          />
          <Button onClick={editDetails} label={'Save Details'} disabled={!validateEdit} />
          <Button type='secondary' onClick={() => setIsEdit(false)} label={'Cancel'} />
        </>
      )}
    </View>
  );
};

export default Profile;
