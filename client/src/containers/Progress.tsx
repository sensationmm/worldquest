import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import AccordionBox from '../components/accordion-box';
import PageHeader from '../components/page-header';
import { formatDate } from '../utils/date';

import { CompletedRiddles } from '../types/Riddle.types';

import progressService from '../services/ProgressService';

import { FunctionalScreenProps, ThemeContext } from '../App';
import Box from '../components/box';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Vars from '../constants/Vars';

import Styled from './Progress.styles';

const Progress: React.FC<FunctionalScreenProps> = ({ setIsLoading, refetchData, setRefetchData }) => {
  const ProgressService = new progressService();
  const [completed, setCompleted] = useState<CompletedRiddles>();
  const theme = useContext(ThemeContext);

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

  return (
    <ScrollView>
      <PageHeader title={'Progress'} />

      <View style={Styled.summary}>
        <Box centered>
          <Text style={Fonts(theme).bold}>Completed</Text>
          <Text style={Fonts(theme).guess}>
            {numCompleted}/{Vars.totalRiddles}
          </Text>
          {!!numCompleted && <Text style={{ ...Fonts(theme).guess, ...Fonts(theme).body }}>Stages</Text>}
        </Box>
        <Box centered>
          <Text style={Fonts(theme).bold}>Guesses</Text>
          <Text style={Fonts(theme).guess}>{numGuesses}</Text>
          {completed && numGuesses > 0 && (
            <Text style={{ ...Fonts(theme).guess, ...Fonts(theme).body }}>
              {(numGuesses / numCompleted).toFixed(1)} / STG
            </Text>
          )}
        </Box>
        <Box centered>
          <Text style={Fonts(theme).bold}>Clues Used</Text>
          <Text style={Fonts(theme).guess}>{numCluesUsed}</Text>
          {completed && numCluesUsed > 0 && (
            <Text style={{ ...Fonts(theme).guess, ...Fonts(theme).body }}>
              {(numCluesUsed / numCompleted).toFixed(1)} / STG
            </Text>
          )}
        </Box>
      </View>

      {(!completed || completed.length === 0) && (
        <Text style={{ ...Fonts(theme).riddle, color: Colors.basic.white, textAlign: 'center', lineHeight: 30 }}>
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
                return (
                  <Text key={`riddle-line${countLine}`} style={(countLine + 1) % 3 === 0 && { marginBottom: 10 }}>
                    {line}
                  </Text>
                );
              })}

              <View style={Styled.section}>
                <Text style={Fonts(theme).bold}>Completed on: </Text>
                <Text>{formatDate(riddle.completedAt)}</Text>
              </View>

              <View style={Styled.section}>
                <Text style={Fonts(theme).bold}>Guesses: </Text>
                <Text>{riddle.guesses}</Text>
              </View>

              <View style={Styled.section}>
                <Text style={Fonts(theme).bold}>Clues used: </Text>
                <Text>{riddle.cluesUsed} / 3</Text>
              </View>
            </AccordionBox>
          );
        })}
    </ScrollView>
  );
};

export default Progress;
