import React, { useEffect, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';

import AccordionBox from '../components/accordion-box';
import Box from '../components/box';
import Button from '../components/button';
import FormInput from '../components/form-input';
import Icon from '../components/icon';
import PageHeader from '../components/page-header';
import { dateNoTime } from '../utils/date';

import { Riddle } from '../types/Riddle.types';

import progressService from '../services/ProgressService';

import { ScreenProps } from '../App';
import Colors from '../constants/Colors';
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
  const [guess, setGuess] = useState<string>('');
  const [hasGuessed, setHasGuessed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  let statusTimeout: number;

  useEffect(() => {
    if (!current) {
      getCurrentRiddle();
    }

    return () => {
      clearTimeout(statusTimeout);
    };
  }, []);

  useEffect(() => {
    if (!!current?.completedAt) {
      setIsCorrect(true);
      setHasGuessed(true);
      setShowStatus(true);
      setGuess(current.guesses[0].toString());
    } else if (current?.lastPlayedAt && new Date(current?.lastPlayedAt) > dateNoTime(new Date())) {
      setIsCorrect(false);
      setHasGuessed(true);
      setShowStatus(true);
      setGuess(current.guesses[0].toString());
    }
  }, [current?.completedAt, current?.lastPlayedAt]);

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

  const solveRiddle = async () => {
    if (current) {
      setIsLoading(true);
      await ProgressService.guess(current.progressId, current.id, guess).then((res) => {
        const { msg, guesses } = res.data;

        setHasGuessed(true);
        setIsLoading(false);
        setIsCorrect(msg === 'CORRECT' ? true : false);

        if (msg === 'INCORRECT') {
          console.log('setCurrent', guesses);
          setCurrent({
            ...current,
            guesses: guesses,
          });
        }

        statusTimeout = setTimeout(() => {
          setShowStatus(true);
        }, 3000);
      });
    }
  };

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

  let spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 750,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View>
      <PageHeader title={current ? `Stage ${current?.order} of ${Vars.totalRiddles}` : 'Home'} />
      <Box centered>
        {current?.question.map((line, count) => {
          return (
            <Text key={`riddle-line${count}`} style={{ ...Fonts.riddle }}>
              {line}
            </Text>
          );
        })}
      </Box>

      {!hasGuessed ? (
        <>
          <FormInput value={guess} onChange={setGuess} placeholder={'Enter your guess...'} />
          <Button onClick={solveRiddle} label={'Check Answer'} disabled={!guess} />
        </>
      ) : (
        <Box centered>
          <Text style={Fonts.bold}>You guessed</Text>
          <Text style={Fonts.guess}>{guess}</Text>

          <View style={Styled.guessStatus}>
            {!showStatus ? (
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Icon name={'circle-notch'} size={'large'} />
              </Animated.View>
            ) : (
              <Icon
                name={isCorrect ? 'check-circle' : 'times-circle'}
                size={'large'}
                color={isCorrect ? Colors.indicator.right : Colors.indicator.wrong}
              />
            )}
          </View>

          {showStatus &&
            (isCorrect ? (
              <>
                <Text style={Fonts.guess}>Congratulations</Text>
                <Text style={Fonts.bold}>Check back tomorrow for Stage {current?.order + 1}!</Text>
              </>
            ) : (
              <>
                <Text style={Fonts.guess}>Sorry</Text>
                <Text style={Fonts.bold}>Try again tomorrow!</Text>
              </>
            ))}
        </Box>
      )}

      {!(hasGuessed && !showStatus) && !current?.completedAt && !isCorrect && current?.guesses && current.guesses.length > 0 && (
        <AccordionBox title={`${current.guesses.length} ${current.guesses.length > 1 ? 'Guesses' : 'Guess'}`}>
          {current.guesses.map((oldGuess, count) => (
            <View key={`guess-${count}`} style={Styled.guess}>
              <Text style={Fonts.bold}>{oldGuess}</Text>
            </View>
          ))}
        </AccordionBox>
      )}

      {!(hasGuessed && !showStatus) && !current?.completedAt && !isCorrect && (
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
      )}
    </View>
  );
};

export default Home;
