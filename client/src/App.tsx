import { FredokaOne_400Regular, useFonts } from '@expo-google-fonts/fredoka-one';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AppLoading } from 'expo';
import React from 'react';

import Icon from './components/icon';
import Main from './layout/main';

import { tabs, tabsAuth } from './App.menu';
import { styles, theme } from './App.style';

import getByValue from './utils/getByValue';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const isLoggedIn = false;

  const [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  const resourcesLoaded = fontsLoaded;

  const icon = (tabsArray: object[], route: any, focused: boolean) => {
    const iconName = getByValue(tabsArray, 'name', route.name).icon;
    const iconLarge = route.name === 'Home';

    return <Icon name={iconName} large={iconLarge} focused={focused} />;
  };

  return (
    <Main>
      {!resourcesLoaded ? (
        <AppLoading testId={'app-loading'} />
      ) : (
        <NavigationContainer theme={theme} testId={'navigation-container'}>
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
      )}
    </Main>
  );
};

export default App;
