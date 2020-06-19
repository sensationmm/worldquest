import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Colors from './src/constants/Colors';
import Home from './src/containers/Home';
import Info from './src/containers/Info';
import Profile from './src/containers/Profile';
import Progress from './src/containers/Progress';
import Stats from './src/containers/Stats';

import Main from './src/layout/main';

import getByValue from './src/utils/getByValue';

const Tab = createMaterialBottomTabNavigator();

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: Colors.brand.primary,
    shadowOpacity: 0,
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.brand.primary,
  },
};

const tabs = [
  { name: 'Progress', component: Progress, icon: 'tasks' },
  { name: 'Stats', component: Stats, icon: 'chart-line' },
  { name: 'Home', component: Home, icon: 'map-marked-alt' },
  { name: 'Profile', component: Profile, icon: 'user' },
  { name: 'Info', component: Info, icon: 'info-circle' },
];

const App = () => {
  return (
    <Main>
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          initialRouteName={'Home'}
          barStyle={styles.tabs}
          labeled={false}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              const iconName = getByValue(tabs, 'name', route.name).icon;
              const iconColor = focused ? Colors.brand.secondary : Colors.basic.white;
              const iconSize = route.name === 'Home' ? 50 : 24;
              const iconMargin = route.name === 'Home' ? 0 : 26;

              return (
                <Icon
                  name={iconName}
                  size={iconSize}
                  color={iconColor}
                  style={{
                    marginTop: iconMargin,
                    height: iconSize,
                    width: iconSize + 6,
                    textAlign: 'center',
                  }}
                  solid
                />
              );
            },
          })}
        >
          {tabs.map((tab) => {
            return <Tab.Screen key={`tab-${tab.name}`} name={tab.name} component={tab.component} />;
          })}
        </Tab.Navigator>
      </NavigationContainer>
    </Main>
  );
};

export default App;
