import { FredokaOne_400Regular, useFonts } from '@expo-google-fonts/fredoka-one';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import Icon, { IconSize } from './components/icon';
import Loader from './components/loader';
import Main from './layout/main';

import { tabsAuth, tabsMain } from './App.menu';
import { navigationTheme, styles } from './App.style';

import getByValue from './utils/getByValue';

import accountService from './services/AccountService';
import { Theme } from './types/User.types';

export type ScreenProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  navigation: any;
  refetchData?: boolean;
  setRefetchData?: Dispatch<SetStateAction<boolean>>;
  setTheme?: Dispatch<SetStateAction<Theme>>;
};

export interface FunctionalScreenProps extends ScreenProps {
  refetchData: boolean;
  setRefetchData: Dispatch<SetStateAction<boolean>>;
}

const Tab = createMaterialBottomTabNavigator();

export const ThemeContext = createContext('brand');

const App = () => {
  const AccountService = new accountService();
  const navigationRef = useNavigationContainerRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refetchData, setRefetchData] = useState(false);
  const [theme, setTheme] = useState<Theme>('brand');

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
          setTheme(response.data.theme);
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

  useEffect(() => {
    if (isLoggedIn) {
      navigationRef.resetRoot({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      navigationRef.resetRoot({
        index: 0,
        routes: [{ name: 'Log In' }],
      });
    }
  }, [isLoggedIn]);

  const tabs = isLoggedIn ? tabsMain : tabsAuth;

  return (
    <SafeAreaView style={styles(theme).main}>
      {!resourcesLoaded ? (
        <ThemeContext.Provider value={theme}>
          <Main>{/* <AppLoading testId={'app-loading'} /> */}</Main>
        </ThemeContext.Provider>
      ) : (
        <ThemeContext.Provider value={theme}>
          <Main>
            <NavigationContainer ref={navigationRef} theme={navigationTheme} /*testId={'navigation-container'}*/>
              <Tab.Navigator
                initialRouteName={isLoggedIn ? 'Home' : 'Log In'}
                barStyle={styles(theme).tabs}
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
                      {({ navigation }) => (
                        <ScrollView style={{ flexGrow: 1 }}>
                          <tab.component
                            setIsLoading={setIsLoading}
                            setIsLoggedIn={setIsLoggedIn}
                            refetchData={isLoggedIn ? refetchData : undefined}
                            setRefetchData={isLoggedIn ? setRefetchData : undefined}
                            setTheme={setTheme}
                            navigation={navigation}
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
        </ThemeContext.Provider>
      )}
    </SafeAreaView>
  );
};

export default App;
