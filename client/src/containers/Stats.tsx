import React from 'react';
import { View } from 'react-native';

import { ScreenProps } from '../App';
import PageHeader from '../components/page-header';

const Stats: React.FC<ScreenProps> = () => {
  return (
    <View>
      <PageHeader title={'Game Stats'} />
    </View>
  );
};

export default Stats;
