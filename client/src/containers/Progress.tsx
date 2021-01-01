import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import AccordionBox from '../components/accordion-box';
import PageHeader from '../components/page-header';
import { formatDate } from '../utils/date';

import { CompletedRiddles } from '../types/Riddle.types';

import progressService from '../services/ProgressService';

import { ScreenProps } from '../App';
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
    if (!completed) {
      getCompletedRiddles();
    }
  }, []);

  return (
    <View>
      <PageHeader title={'Solutions'} />

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
                <Text style={Fonts.bold}>Clues used: </Text>
                <Text>{riddle.cluesUsed}</Text>
              </View>
            </AccordionBox>
          );
        })}
    </View>
  );
};

export default Progress;
