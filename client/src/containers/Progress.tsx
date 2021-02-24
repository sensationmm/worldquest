import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import AccordionBox from '../components/accordion-box';
import PageHeader from '../components/page-header';
import { formatDate } from '../utils/date';

import { CompletedRiddles } from '../types/Riddle.types';

import progressService from '../services/ProgressService';

import { ScreenProps } from '../App';
import Box from '../components/box';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Vars from '../constants/Vars';

import Styled from './Progress.styles';

const Progress: React.FC<ScreenProps> = ({ setIsLoading }) => {
  const ProgressService = new progressService();
  const [completed, setCompleted] = useState<CompletedRiddles>();

  const getCompletedRiddles = async () => {
    setIsLoading(true);
    await ProgressService.completed().then((res) => {
      setCompleted(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getCompletedRiddles();
  }, []);

  useEffect(() => {
    return () => {
      console.log('unmount');
      setCompleted(undefined);
    };
  }, []);

  const numCompleted = completed?.length || 0;
  const numGuesses = completed?.reduce((accumulator, currentValue) => accumulator + currentValue.guesses, 0) || 0;
  const numCluesUsed = completed?.reduce((accumulator, currentValue) => accumulator + currentValue.cluesUsed, 0) || 0;

  return (
    <View>
      <PageHeader title={'Progress'} />

      <View style={Styled.summary}>
        <Box centered>
          <Text>Completed</Text>
          <Text style={Fonts.guess}>{numCompleted}</Text>
          {!!numCompleted && <Text style={{ ...Fonts.guess, ...Fonts.body }}>Stages</Text>}
        </Box>
        <Box centered>
          <Text>Guesses</Text>
          <Text style={Fonts.guess}>{numGuesses}</Text>
          {completed && <Text style={{ ...Fonts.guess, ...Fonts.body }}>AVG: {(numGuesses / numCompleted).toFixed(1)}</Text>}
        </Box>
        <Box centered>
          <Text>Clues Used</Text>
          <Text style={Fonts.guess}>{numCluesUsed}</Text>
          {completed && <Text style={{ ...Fonts.guess, ...Fonts.body }}>AVG: {(numCluesUsed / numCompleted).toFixed(1)}</Text>}
        </Box>
      </View>

      {(!completed || completed.length === 0) && (
        <Text style={{ ...Fonts.riddle, color: Colors.basic.white, textAlign: 'center' }}>
          Your completed stages will appear here as you progress through the Quest
        </Text>
      )}

      {completed &&
        completed.map((riddle, count) => {
          return (
            <AccordionBox key={`completed-${count}`} title={`${riddle.order}/${Vars.totalRiddles}: ${riddle.answer}`}>
              {riddle.question.map((line, countLine) => {
                return <Text key={`riddle-line${countLine}`}>{line}</Text>;
              })}

              <View style={Styled.section}>
                <Text style={Fonts.bold}>Completed on: </Text>
                <Text>{formatDate(riddle.completedAt)}</Text>
              </View>

              <View style={Styled.section}>
                <Text style={Fonts.bold}>Guesses: </Text>
                <Text>{riddle.guesses}</Text>
              </View>

              <View style={Styled.section}>
                <Text style={Fonts.bold}>Clues used: </Text>
                <Text>{riddle.cluesUsed} / 3</Text>
              </View>
            </AccordionBox>
          );
        })}
    </View>
  );
};

export default Progress;
