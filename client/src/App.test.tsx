import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';

import ComponentMock from '../src/mocks/componentMock';
import App from './App';

jest.mock('@expo-google-fonts/fredoka-one', () => ({
  useFonts: jest.fn().mockReturnValueOnce([false]).mockReturnValue([true]),
}));

jest.mock('@react-navigation/native', () => ({
  DefaultTheme: {},
  NavigationContainer: jest.fn(() => <ComponentMock />),
}));

jest.mock('@react-navigation/material-bottom-tabs', () => ({
  createMaterialBottomTabNavigator: jest.fn().mockReturnValue({
    Navigator: jest.fn(() => <ComponentMock />),
    Screen: jest.fn(() => <ComponentMock />),
  }),
}));

describe('App', () => {
  it('renders without crashing if fonts fail to load', () => {
    const rendered = renderer.create(<App />);
    const element = rendered.root.findByType(View);
    // const loader = element.findAll((n) => n.type === AppLoading && n.props.testId === 'app-loading');
    const navigationContainer = element.findAll((n) => n.type === NavigationContainer && n.props.testId === 'navigation-container');

    expect(rendered.toJSON()).toBeTruthy();
    expect(loader.length).toBe(1);
    expect(navigationContainer.length).toBe(0);
  });

  it('renders without crashing if fonts load', () => {
    const rendered = renderer.create(<App />);
    const element = rendered.root.findByType(View);
    // const loader = element.findAll((n) => n.type === AppLoading && n.props.testId === 'app-loading');
    const navigationContainer = element.findAll((n) => n.type === NavigationContainer && n.props.testId === 'navigation-container');

    expect(rendered.toJSON()).toBeTruthy();
    expect(loader.length).toBe(0);
    expect(navigationContainer.length).toBe(1);
  });
});
