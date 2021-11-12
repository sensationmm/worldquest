import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import AccordionBox from '../components/accordion-box';
import PageHeader from '../components/page-header';
import { formatDate } from '../utils/date';

import { CompletedRiddles } from '../types/Riddle.types';

import progressService from '../services/ProgressService';

import { FunctionalScreenProps } from '../App';
import Box from '../components/box';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Vars from '../constants/Vars';

import Styled from './Progress.styles';

const Progress: React.FC<FunctionalScreenProps> = ({ setIsLoading, refetchData, setRefetchData }) => {
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
    if (!completed || refetchData) {
      getCompletedRiddles();
      setRefetchData(false);
    }
  }, []);

  const numCompleted = completed?.length || 0;
  const numGuesses = completed?.reduce((accumulator, currentValue) => accumulator + currentValue.guesses, 0) || 0;
  const numCluesUsed = completed?.reduce((accumulator, currentValue) => accumulator + currentValue.cluesUsed, 0) || 0;

  console.log('Progress');
  return (
    <ScrollView>
      <PageHeader title={'Progress'} />

      <View style={Styled.summary}>
        <Box centered>
          <Text>Completed</Text>
          <Text style={Fonts.guess}>
            {numCompleted}/{Vars.totalRiddles}
          </Text>
          {!!numCompleted && <Text style={{ ...Fonts.guess, ...Fonts.body }}>Stages</Text>}
        </Box>
        <Box centered>
          <Text>Guesses</Text>
          <Text style={Fonts.guess}>{numGuesses}</Text>
          {completed && numGuesses > 0 && <Text style={{ ...Fonts.guess, ...Fonts.body }}>AVG: {(numGuesses / numCompleted).toFixed(1)}</Text>}
        </Box>
        <Box centered>
          <Text>Clues Used</Text>
          <Text style={Fonts.guess}>{numCluesUsed}</Text>
          {completed && numCluesUsed > 0 && <Text style={{ ...Fonts.guess, ...Fonts.body }}>AVG: {(numCluesUsed / numCompleted).toFixed(1)}</Text>}
        </Box>
      </View>

      {(!completed || completed.length === 0) && (
        <Text style={{ ...Fonts.riddle, color: Colors.basic.white, textAlign: 'center', lineHeight: 30 }}>
          Your completed stages
          {'\n'}
          will appear here as you
          {'\n'}
          progress through the Quest
        </Text>
      )}

      {completed &&
        completed.map((riddle, count) => {
          return (
            <AccordionBox key={`completed-${count}`} title={`Stage ${riddle.order}: ${riddle.answer}`}>
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
    </ScrollView>
  );
};

export default Progress;
