import React, { useEffect, useState } from 'react';
import { DimensionValue, Text, View } from 'react-native';

import { FunctionalScreenProps } from '../App';
import PageHeader from '../components/page-header';
import statsService from '../services/StatsService';
import { Stat } from '../types/Stats.types';

import Styled from './Stats.styles';
import Box from '../components/box';
import Fonts from '../constants/Fonts';

import { formatDate } from '../utils/date';
import Avatar from '../components/avatar';
import Vars from '../constants/Vars';

const Stats: React.FC<FunctionalScreenProps> = ({ setIsLoading }) => {
  const StatsService = new statsService();
  const [stats, setStats] = useState<Stat>();

  useEffect(() => {
    getLatestStats();
  }, []);

  const getLatestStats = async () => {
    setIsLoading(true);
    await StatsService.latest().then((res) => {
      if (res.status === 200) {
        setStats({
          completedStages: res.data.completedStages,
          date: res.data.date,
          leader: res.data.leader,
          numUsersPerStage: res.data.numUsersPerStage,
          numUsersPerStageMax: res.data.numUsersPerStageMax,
          totalUsers: res.data.totalUsers,
        });
      }
    });
    setIsLoading(false);
  };

  const renderChart = () => {
    const chartBars = [];

    const barHeight = (key: string): DimensionValue => {
      return stats.numUsersPerStage.hasOwnProperty(key)
        ? `${(stats.numUsersPerStage[key] / stats.numUsersPerStageMax) * 100}%`
        : `0%`;
    };

    for (let i = 0; i < Vars.totalRiddles; i++) {
      chartBars.push(
        <View
          key={`bar-${i}`}
          style={{
            ...Styled.bar,
            width: `${100 / Vars.totalRiddles}%`,
            height: barHeight(`stage${i + 1}`),
            borderLeftWidth: i !== 0 ? 1 : 0,
          }}
        />
      );
    }

    return chartBars;
  };

  return (
    <View>
      <PageHeader title={'Game Stats'} />

      <Box>
        <View style={Styled.leaderContainer}>
          <Avatar src={stats?.leader.avatar} />
          <View style={Styled.leaderText}>
            <Text style={Fonts.bold}>Current Leader</Text>
            <Text style={{ ...Fonts.guess, textAlign: 'left', width: '85%' }} numberOfLines={2}>
              {stats?.leader.name || '-'}
            </Text>
          </View>
        </View>
      </Box>

      {stats && (
        <Box title='Global Progress'>
          <View>
            <View style={Styled.graph}>{renderChart()}</View>
            <View style={Styled.graphLabels}>
              <Text>1</Text>
              <Text>Stage Number</Text>
              <Text>24</Text>
            </View>
          </View>
        </Box>
      )}

      <View style={Styled.summary}>
        <Box centered>
          <Text style={Fonts.bold}>Total Users</Text>
          <Text style={Fonts.guess}>{stats?.totalUsers || '-'}</Text>
        </Box>
        <Box centered>
          <Text style={Fonts.bold}>Avg Guesses</Text>
          <Text style={Fonts.guess}>
            {stats ? (stats?.completedStages.guessesMade / stats?.completedStages.total).toFixed(2) : '-'}
          </Text>
          <Text style={{ ...Fonts.body, ...Fonts.bold }}>per stage</Text>
        </Box>
        <Box centered>
          <Text style={Fonts.bold}>Avg Clues</Text>
          <Text style={Fonts.guess}>
            {stats ? (stats?.completedStages.cluesUsed / stats?.completedStages.total).toFixed(2) : '-'}
          </Text>
          <Text style={{ ...Fonts.body, ...Fonts.bold }}>per stage</Text>
        </Box>
      </View>

      {stats && <Text style={{ textAlign: 'center' }}>Accurate as of {formatDate(stats?.date, true)}</Text>}
    </View>
  );
};

export default Stats;
