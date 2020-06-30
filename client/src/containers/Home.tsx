import React from 'react';
import { Text, View } from 'react-native';

import PageHeader from '../components/page-header';
import Box from '../layout/box';

const Home = () => {
  return (
    <View>
      <PageHeader title={'Home'} />
      <Box>
        <Text>Riddle</Text>
      </Box>
      <Box>
        <Text>Hints</Text>
      </Box>
      <Box>
        <Text>Guess</Text>
      </Box>
    </View>
  );
};

export default Home;
