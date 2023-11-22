import * as SecureStore from 'expo-secure-store';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { View } from 'react-native';

import { ScreenProps } from '../App';
import PageHeader from '../components/page-header';
import FormInput from '../components/form-input';
import { ErrorBox } from '../components/box';
import Button from '../components/button';
import accountService from '../services/AccountService';
import progressService from '../services/ProgressService';

const Register: React.FC<ScreenProps> = ({ setIsLoading, setIsLoggedIn }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(undefined);

  const AccountService = new accountService();
  const ProgressService = new progressService();

  const onRegister = async () => {
    setIsLoading(true);

    AccountService.register(name, email, password, password2).then(async (response) => {
      if (response.status === 200) {
        AccountService.login(email, password).then(async (response) => {
          if (response.status === 200) {
            await SecureStore.setItemAsync('jwt_token', response.data.token).then(async () => {
              await ProgressService.start().then(() => {
                setIsLoggedIn(true);
                setIsLoading(false);
              });
            });
          } else {
            setError(response.msg);
            setIsLoading(false);
          }
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

  const submitDisabled = name === '' || email === '' || password === '' || password2 === '' || error !== undefined;

  return (
    <View>
      <PageHeader title={'Register'} />

      <FormInput label={'First Name'} value={name} onChange={(val: string) => onType(val, setName)} />
      <FormInput label={'Email Address'} value={email} onChange={(val: string) => onType(val, setEmail)} />
      <FormInput isPassword label={'Password'} value={password} onChange={(val: string) => onType(val, setPassword)} />
      <FormInput
        isPassword
        label={'Confirm Password'}
        value={password2}
        onChange={(val: string) => onType(val, setPassword2)}
      />

      {error && <ErrorBox>{error}</ErrorBox>}

      <Button onClick={onRegister} label={'Register'} disabled={submitDisabled} />
    </View>
  );
};

export default Register;
