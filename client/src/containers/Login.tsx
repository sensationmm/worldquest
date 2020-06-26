import React, { useState } from 'react';
import { View } from 'react-native';

import Button from '../components/button';
import FormInput from '../components/form-input';
import PageHeader from '../components/page-header';

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
