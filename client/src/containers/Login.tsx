import * as SecureStore from 'expo-secure-store';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Link } from '@react-navigation/native';

import Box, { ErrorBox } from '../components/box';
import Button from '../components/button';
import FormInput from '../components/form-input';
import PageHeader from '../components/page-header';

import accountService from '../services/AccountService';

import { ScreenProps, ThemeContext } from '../App';
import Fonts from '../constants/Fonts';

const Login: React.FC<ScreenProps> = ({ setIsLoading, setIsLoggedIn, setTheme }) => {
  const [email, setEmail] = useState('testuser@sensationmultimedia.co.uk'); // @TODO: remove hardcoded email
  const [password, setPassword] = useState('Asprilla319!'); // @TODO: remove hardcoded password
  const [error, setError] = useState(undefined);
  const theme = useContext(ThemeContext);
  const [isReset, setIsReset] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [isNewPass, setIsNewPass] = useState(false);
  const [authCodeExpired, setAuthCodeExpired] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const AccountService = new accountService();

  const onLogin = async () => {
    setIsLoading(true);

    AccountService.login(email, password).then(async (response) => {
      if (response.status === 200) {
        await SecureStore.setItemAsync('jwt_token', response.data.token).then(() => {
          setTheme(response.data.theme);
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

  const setPasswordReset = () => {
    setIsReset(true);
    setError(false);
  };

  const resetRequest = () => {
    setIsLoading(true);
    return AccountService.requestReset(email).then((response) => {
      if (response.status === 200) {
        setIsAuth(true);
        setIsLoading(false);
      } else {
        setError(response.msg);
        setIsLoading(false);
      }
    });
  };

  const authoriseReset = () => {
    setIsLoading(true);
    AccountService.authoriseReset(email, authCode).then(async (response) => {
      if (response.status === 200) {
        await SecureStore.setItemAsync('jwt_token', response.data.token).then(() => {
          setAuthCode('');
          setIsNewPass(true);
          setIsLoading(false);
        });
      } else {
        setError(response.msg);
        setIsLoading(false);
        if (response.msg === 'Authorisation Code Expired') {
          setAuthCodeExpired(true);
        }
      }
    });
  };

  const resetPassword = () => {
    setIsLoading(true);
    AccountService.resetPassword(email, password, passwordConfirm).then((res) => {
      if (res.status === 200) {
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setIsReset(false);
        setIsAuth(false);
        setIsNewPass(false);
        setIsLoading(false);
        setTheme(res.data.theme);
        setIsLoggedIn(true);
      } else {
        setError(res.msg);
        setIsLoading(false);
      }
    });
  };

  const getAction = () => {
    if (!isReset) {
      onLogin();
    } else if (!isAuth) {
      resetRequest();
    } else if (!isNewPass) {
      authoriseReset();
    } else {
      resetPassword();
    }
  };

  const getLabel = () => {
    if (!isReset) {
      return 'Log In';
    } else if (!isAuth) {
      return 'Request Reset';
    } else if (!isNewPass) {
      return 'Authorise Reset';
    } else {
      return 'Set New Password';
    }
  };

  const cancelReset = () => {
    setIsAuth(false);
    setIsReset(false);
    setIsNewPass(false);
    setAuthCode('');
    setPasswordConfirm('');
  };

  const restartResetFlow = async () => {
    await resetRequest();
    setAuthCode('');
    setAuthCodeExpired(false);
    setError(undefined);
  };

  const submitDisabled =
    (!isReset && (email === '' || password === '' || error !== undefined)) ||
    (isReset && !isAuth && email === '') ||
    (isReset && isAuth && !isNewPass && (email === '' || authCode === '' || authCode.length !== 6)) ||
    (isReset && isAuth && isNewPass && (password === '' || passwordConfirm === ''));

  return (
    <View>
      <PageHeader title={!isReset ? 'Log In' : 'Reset Password'} />

      <FormInput
        label={'Email address'}
        value={email}
        onChange={(val: string) => onType(val, setEmail)}
        disabled={isNewPass}
      />

      {(!isReset || isNewPass) && (
        <FormInput
          isPassword
          label={'Password'}
          value={password}
          onChange={(val: string) => onType(val, setPassword)}
        />
      )}

      {isReset && isAuth && !isNewPass && (
        <FormInput label={'Authorisation code'} value={authCode} onChange={(val: string) => onType(val, setAuthCode)} />
      )}

      {isNewPass && (
        <FormInput
          isPassword
          label={'Confirm Password'}
          value={passwordConfirm}
          onChange={(val: string) => onType(val, setPasswordConfirm)}
        />
      )}

      {error && <ErrorBox>{error}</ErrorBox>}

      {!authCodeExpired ? (
        <Button onClick={getAction} label={getLabel()} disabled={submitDisabled} />
      ) : (
        <Button onClick={restartResetFlow} label='Request New Auth Code' />
      )}
      {isReset && <Button type='secondary' onClick={cancelReset} label='Cancel' />}

      {!isReset ? (
        <>
          <Text
            style={{ ...Fonts(theme).body, ...Fonts(theme).bold, color: 'white', textAlign: 'center', marginTop: 20 }}
          >
            Don't have an account yet?
          </Text>
          <Text style={{ ...Fonts(theme).body, ...Fonts(theme).bold, color: 'white', textAlign: 'center' }}>
            <Link to={{ screen: 'Register' }} style={{ textDecorationLine: 'underline' }}>
              Register here
            </Link>
          </Text>

          <Text
            style={{ ...Fonts(theme).body, ...Fonts(theme).bold, color: 'white', textAlign: 'center', marginTop: 30 }}
          >
            Forgot your password?
          </Text>
          <TouchableOpacity onPress={setPasswordReset}>
            <Text
              style={{
                ...Fonts(theme).body,
                ...Fonts(theme).bold,
                color: 'white',
                textAlign: 'center',
                textDecorationLine: 'underline',
              }}
            >
              Reset here
            </Text>
          </TouchableOpacity>
        </>
      ) : !isAuth ? (
        <Box>
          <Text style={{ textAlign: 'center' }}>
            If an account exists with this email address, an authorisation code will be emailed to you.
          </Text>
          <Text style={{ textAlign: 'center', marginTop: 10 }}>This code will expire after 15 minutes.</Text>
        </Box>
      ) : (
        !isNewPass && (
          <Box>
            <Text style={{ textAlign: 'center' }}>
              Enter the authorisation code from your email to reset your password.
            </Text>
          </Box>
        )
      )}
    </View>
  );
};

export default Login;
