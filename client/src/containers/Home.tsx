import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import Box from '../components/box';
import Button from '../components/button';
import PageHeader from '../components/page-header';

import { Riddle } from '../types/Riddle.types';

import progressService from '../services/ProgressService';

import { ScreenProps } from '../App';
import Fonts from '../constants/Fonts';
import Vars from '../constants/Vars';
import Styled from './Home.styles';

enum Clue {
  CLUE1 = 'clue1',
  CLUE2 = 'clue2',
  CLUE3 = 'clue3',
}

const Home: React.FC<ScreenProps> = ({ setIsLoading }) => {
  const ProgressService = new progressService();
  const [current, setCurrent] = useState<Riddle>();

  const getCurrentRiddle = async () => {
    setIsLoading(true);
    await ProgressService.current().then((res) => {
      setCurrent(res.data);
      setIsLoading(false);
    });
  };

  const getNextClue = async () => {
    if (current) {
      setIsLoading(true);
      await ProgressService.clue(current.progressId).then((res) => {
        setCurrent(res.data);
        setIsLoading(false);
      });
    }
  };

  useEffect(() => {
    if (!current) {
      getCurrentRiddle();
    }
  }, []);

  let cluesUsed = 0;

  const clueAvailable = current && !current?.hasOwnProperty('clue3');
  const noClueTokens = current && current.clueTokens === 0;

  const clues =
    current &&
    ['clue1', 'clue2', 'clue3'].map((clue, count) => {
      if (current.hasOwnProperty(clue)) {
        cluesUsed++;
        return (
          <View key={`clue-${count}`} style={{ ...Styled.hint }}>
            <Text>{current[clue as Clue]}</Text>
          </View>
        );
      }
    });

  return (
    <View>
      <PageHeader title={current ? `Riddle ${current?.order} of ${Vars.totalRiddles}` : 'Home'} />
      <Box centered>
        {current?.question.map((line, count) => {
          return (
            <Text key={`riddle-line${count}`} style={{ ...Fonts.riddle }}>
              {line}
            </Text>
          );
        })}
      </Box>

      <Box>
        <Text>Guess</Text>
      </Box>

      <Box
        title={'Clues'}
        action={
          clueAvailable ? (
            <Button small onClick={getNextClue} label={`Get clue ${cluesUsed + 1} of 3`} disabled={noClueTokens} />
          ) : (
            <Text style={Styled.newHintTitle}>All clues used</Text>
          )
        }
      >
        {clues}

        {clueAvailable && noClueTokens && (
          <View style={Styled.hintUnavailable}>
            <Button small onClick={getNextClue} label={`Buy more clue tokens`} />
          </View>
        )}
      </Box>
    </View>
  );
};

export default Home;
