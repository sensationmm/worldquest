import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';

import { ScreenProps } from '../App';
import Box from '../components/box';
import PageHeader from '../components/page-header';
import { Link } from '@react-navigation/native';

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

      <Box title={'Credits'}>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.freepik.com/free-vector/animal-avatars-flat-design_772910.htm#query=avatar&position=29&from_view=search&track=sph&uuid=f681fb4f-88ae-4ae1-bc5e-a368e648b3e8'
            ).catch((err) => console.error('An error occurred', err))
          }
        >
          <Text>
            Avatar images by <Text style={{ textDecorationLine: 'underline' }}>Freepik</Text>.
          </Text>
        </TouchableOpacity>
      </Box>
    </View>
  );
};

export default Info;
