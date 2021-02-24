import React from 'react';
import { Text, View } from 'react-native';

import { ScreenProps } from '../App';
import Box from '../components/box';
import PageHeader from '../components/page-header';

const Info: React.FC<ScreenProps> = () => {
  return (
    <View>
      <PageHeader title={'Info'} />

      <Box title={'About the Quest'}>
        <Text>Text about the Quest</Text>
      </Box>

      <Box title={'In-App Purchases'}>
        <Text>Joining the Quest, Buying Clues, etc.</Text>
      </Box>
    </View>
  );
};

export default Info;
