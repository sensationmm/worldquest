import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

jest.mock('@expo-google-fonts/fredoka-one', () => ({
  useFonts: jest.fn().mockReturnValueOnce([false]).mockReturnValue([true]),
}));

describe('App Entry', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<App />).toJSON()).toBeTruthy();
  });
});
