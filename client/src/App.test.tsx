import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';
import ComponentMock from '../src/mocks/componentMock';

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
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders without crashing if fonts load', () => {
    expect(renderer.create(<App />).toJSON()).toBeTruthy();
  });
});
