import { FredokaOne_400Regular, useFonts } from '@expo-google-fonts/fredoka-one';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SafeAreaView, ScrollView } from 'react-native';

import Icon, { IconSize } from './components/icon';
import Loader from './components/loader';
import Main from './layout/main';

import { tabsAuth, tabsMain } from './App.menu';
import { styles, theme } from './App.style';

import getByValue from './utils/getByValue';

import accountService from './services/AccountService';

export type ScreenProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

export interface FunctionalScreenProps extends ScreenProps {
  refetchData: boolean;
  setRefetchData: Dispatch<SetStateAction<boolean>>;
}

const Tab = createMaterialBottomTabNavigator();

EStyleSheet.build();

const App = () => {
  const AccountService = new accountService();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refetchData, setRefetchData] = useState(false);

  const [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
  });

  const resourcesLoaded = fontsLoaded;

  const icon = (tabsArray: object[], route: any, focused: boolean) => {
    const iconName = getByValue(tabsArray, 'name', route.name).icon;
    const iconLarge = route.name === 'Home';

    return <Icon name={iconName} size={iconLarge ? IconSize.MEDIUM : IconSize.SMALL} focused={focused} />;
  };

  const reauth = async () => {
    const authToken = await SecureStore.getItemAsync('jwt_token');

    if (!isLoggedIn && authToken) {
      setIsLoading(true);
      AccountService.current().then(async (response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          setIsLoading(false);
        } else {
          await SecureStore.deleteItemAsync('jwt_token');
          setIsLoading(false);
        }
      });
    } else {
      await SecureStore.deleteItemAsync('jwt_token');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reauth();
  }, []);

  const tabs = isLoggedIn ? tabsMain : tabsAuth;

  return (
    <SafeAreaView style={styles.main}>
      {!resourcesLoaded ? (
        <Main>{/* <AppLoading testId={'app-loading'} /> */}</Main>
      ) : (
        <Main>
          <NavigationContainer theme={theme} testId={'navigation-container'}>
            <Tab.Navigator
              initialRouteName={isLoggedIn ? 'Home' : 'Log In'}
              barStyle={styles.tabs}
              labeled={false}
              screenOptions={({ route }: { route: any }) => ({
                tabBarIcon: ({ focused }: { focused: boolean }) => {
                  return icon(tabs, route, focused);
                },
              })}
            >
              {tabs.map((tab) => {
                return (
                  <Tab.Screen key={`tab-${tab.name}`} name={tab.name}>
                    {() => (
                      <ScrollView style={{ flexGrow: 1 }}>
                        <tab.component
                          setIsLoading={setIsLoading}
                          setIsLoggedIn={setIsLoggedIn}
                          refetchData={isLoggedIn ? refetchData : undefined}
                          setRefetchData={isLoggedIn ? setRefetchData : undefined}
                        />
                      </ScrollView>
                    )}
                  </Tab.Screen>
                );
              })}
            </Tab.Navigator>
          </NavigationContainer>
          <Loader isLoading={isLoading} />
        </Main>
      )}
    </SafeAreaView>
  );
};

export default App;
