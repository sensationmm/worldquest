import { ApolloProvider } from '@apollo/react-hooks';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Colors from './constants/Colors';
import Home from './containers/Home';
import Info from './containers/Info';
import Login from './containers/Login';
import Profile from './containers/Profile';
import Progress from './containers/Progress';
import Register from './containers/Register';
import Stats from './containers/Stats';

import Main from './layout/main';

import getByValue from './utils/getByValue';

const client = new ApolloClient({
  uri: 'http://localhost:5000',
});

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

const tabsAuth = [
  { name: 'Log In', component: Login, icon: 'user' },
  { name: 'Register', component: Register, icon: 'user-plus' },
  { name: 'Info', component: Info, icon: 'info-circle' },
];

const App = () => {
  let isLoggedIn = false;

  const icon = (tabsArray: object[], route: any, focused: boolean) => {
    const iconName = getByValue(tabsArray, 'name', route.name).icon;
    const iconColor = focused ? Colors.basic.white : Colors.brand.secondary;
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
  };

  return (
    <ApolloProvider client={client}>
      <Main>
        <NavigationContainer theme={theme}>
          {isLoggedIn ? (
            <Tab.Navigator
              initialRouteName={'Home'}
              barStyle={styles.tabs}
              labeled={false}
              screenOptions={({ route }: { route: any }) => ({
                tabBarIcon: ({ focused }: { focused: boolean }) => {
                  return icon(tabs, route, focused);
                },
              })}
            >
              {tabs.map((tab) => {
                return <Tab.Screen key={`tab-${tab.name}`} name={tab.name} component={tab.component} />;
              })}
            </Tab.Navigator>
          ) : (
            <Tab.Navigator
              initialRouteName={'Home'}
              barStyle={styles.tabs}
              labeled={false}
              screenOptions={({ route }: { route: any }) => ({
                tabBarIcon: ({ focused }: { focused: boolean }) => {
                  return icon(tabsAuth, route, focused);
                },
              })}
            >
              {tabsAuth.map((tab) => {
                return <Tab.Screen key={`tab-${tab.name}`} name={tab.name} component={tab.component} />;
              })}
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </Main>
    </ApolloProvider>
  );
};

export default App;
