import React, { useContext, useEffect, useState } from 'react';
import { DimensionValue, Text, View } from 'react-native';

import { FunctionalScreenProps, ThemeContext } from '../App';
import PageHeader from '../components/page-header';
import statsService from '../services/StatsService';
import { Stat } from '../types/Stats.types';

import styles from './Stats.styles';
import Box from '../components/box';
import Fonts from '../constants/Fonts';

import { formatDate } from '../utils/date';
import Avatar from '../components/avatar';
import Vars from '../constants/Vars';
import { getStyles } from '../utils/theme';
import accountService from '../services/AccountService';

const Stats: React.FC<FunctionalScreenProps> = ({ setIsLoading }) => {
  const StatsService = new statsService();
  const AccountService = new accountService();
  const [stats, setStats] = useState<Stat>();
  const Styled = getStyles(styles);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    getLatestStats();
  }, []);

  const getLatestStats = async () => {
    setIsLoading(true);
    await StatsService.latest().then(async (res) => {
      if (res.status === 200) {
        const stats = {
          completedStages: res.data.completedStages,
          date: res.data.date,
          leader: res.data.leader,
          numUsersPerStage: res.data.numUsersPerStage,
          numUsersPerStageMax: res.data.numUsersPerStageMax,
          totalUsers: res.data.totalUsers,
        };

        if (res.data.leader.avatar !== '') {
          await AccountService.getAvatar(res.data.leader.avatar).then(async (res2) => {
            if (res2.status === 200) {
              stats.leader.avatar = URL.createObjectURL(res2.data);
            }
          });
        }

        setStats(stats);
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
            <Text style={Fonts(theme).bold}>Current Leader</Text>
            <Text style={{ ...Fonts(theme).guess, textAlign: 'left', width: '85%' }} numberOfLines={2}>
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
          <Text style={Fonts(theme).bold}>Total Users</Text>
          <Text style={Fonts(theme).guess}>{stats?.totalUsers || '-'}</Text>
        </Box>
        <Box centered>
          <Text style={Fonts(theme).bold}>Avg Guesses</Text>
          <Text style={Fonts(theme).guess}>
            {stats ? (stats?.completedStages.guessesMade / stats?.completedStages.total).toFixed(2) : '-'}
          </Text>
          <Text style={{ ...Fonts(theme).body, ...Fonts(theme).bold }}>per stage</Text>
        </Box>
        <Box centered>
          <Text style={Fonts(theme).bold}>Avg Clues</Text>
          <Text style={Fonts(theme).guess}>
            {stats ? (stats?.completedStages.cluesUsed / stats?.completedStages.total).toFixed(2) : '-'}
          </Text>
          <Text style={{ ...Fonts(theme).body, ...Fonts(theme).bold }}>per stage</Text>
        </Box>
      </View>

      {stats && <Text style={{ textAlign: 'center' }}>Accurate as of {formatDate(stats?.date, true)}</Text>}
    </View>
  );
};

export default Stats;
