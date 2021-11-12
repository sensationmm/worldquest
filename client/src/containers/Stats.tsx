import React from 'react';
import { View } from 'react-native';

import { FunctionalScreenProps } from '../App';
import PageHeader from '../components/page-header';

const Stats: React.FC<FunctionalScreenProps> = () => {
  return (
    <View>
      <PageHeader title={'Game Stats'} />
    </View>
  );
};

export default Stats;
