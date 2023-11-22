import * as SecureStore from 'expo-secure-store';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { View } from 'react-native';

import { ErrorBox } from '../components/box';
import Button from '../components/button';
import FormInput from '../components/form-input';
import PageHeader from '../components/page-header';

import accountService from '../services/AccountService';

import { ScreenProps } from '../App';

const Login: React.FC<ScreenProps> = ({ setIsLoading, setIsLoggedIn }) => {
  const [email, setEmail] = useState('testuser@sensationmultimedia.co.uk');
  const [password, setPassword] = useState('Asprilla319!');
  const [error, setError] = useState(undefined);

  const AccountService = new accountService();

  const onLogin = async () => {
    setIsLoading(true);

    AccountService.login(email, password).then(async (response) => {
      if (response.status === 200) {
        await SecureStore.setItemAsync('jwt_token', response.data.token).then(() => {
          setIsLoggedIn(true);
          setIsLoading(false);
        });
      } else {
        setError(response.msg);
        setIsLoading(false);
      }
    });
  };

  const onType = (val: string, setState: Dispatch<SetStateAction<string>>) => {
    if (error) {
      setError(undefined);
    }
    setState(val);
  };

  const submitDisabled = email === '' || password === '' || error !== undefined;

  return (
    <View>
      <PageHeader title={'Log In'} />

      <FormInput label={'Email address'} value={email} onChange={(val: string) => onType(val, setEmail)} />
      <FormInput isPassword label={'Password'} value={password} onChange={(val: string) => onType(val, setPassword)} />

      {error && <ErrorBox>{error}</ErrorBox>}

      <Button onClick={onLogin} label={'Log In'} disabled={submitDisabled} />
    </View>
  );
};

export default Login;
