import React from 'react';
import { View } from 'react-native';

import { ScreenProps } from '../App';
import PageHeader from '../components/page-header';

const Register: React.FC<ScreenProps> = () => {
  return (
    <View>
      <PageHeader title={'Register'} />
    </View>
  );
};

export default Register;
