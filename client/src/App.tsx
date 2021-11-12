import { FredokaOne_400Regular, useFonts } from '@expo-google-fonts/fredoka-one';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from './components/icon';
import Loader from './components/loader';
import Main from './layout/main';

import { tabs, tabsAuth } from './App.menu';
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

    return <Icon name={iconName} size={iconLarge ? 'medium' : 'small'} focused={focused} />;
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

  return (
    <>
      {!resourcesLoaded ? (
        <Main>{/* <AppLoading testId={'app-loading'} /> */}</Main>
      ) : (
        <Main>
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
                  return (
                    <Tab.Screen key={`tab-${tab.name}`} name={tab.name}>
                      {() => (
                        <tab.component
                          setIsLoading={setIsLoading}
                          setIsLoggedIn={setIsLoggedIn}
                          refetchData={refetchData}
                          setRefetchData={setRefetchData}
                        />
                      )}
                    </Tab.Screen>
                  );
                })}
              </Tab.Navigator>
            ) : (
              <Tab.Navigator
                initialRouteName={'Log In'}
                barStyle={styles.tabs}
                labeled={false}
                screenOptions={({ route }: { route: any }) => ({
                  tabBarIcon: ({ focused }: { focused: boolean }) => {
                    return icon(tabsAuth, route, focused);
                  },
                })}
              >
                {tabsAuth.map((tab) => {
                  return (
                    <Tab.Screen key={`tab-${tab.name}`} name={tab.name}>
                      {() => <tab.component setIsLoading={setIsLoading} setIsLoggedIn={setIsLoggedIn} />}
                    </Tab.Screen>
                  );
                })}
              </Tab.Navigator>
            )}
          </NavigationContainer>
          <Loader isLoading={isLoading} />
        </Main>
      )}
    </>
  );
};

export default App;
