import React, { useState } from 'react';
import { Text, View } from 'react-native';

import Button from '../components/button';
import PageHeader from '../components/page-header';
import FormInput from '../components/form-input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <PageHeader title={'Log In'} />

      <FormInput label={'Email address'} value={email} onChange={setEmail} />
      <FormInput isPassword label={'Password'} value={password} onChange={setPassword} />

      <Button onClick={() => console.log('login!')} label={'Log In'} />
    </View>
  );
};

export default Login;
