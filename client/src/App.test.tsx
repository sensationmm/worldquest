import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';

jest.mock('@expo-google-fonts/fredoka-one', () => ({
  useFonts: jest.fn().mockReturnValue(true),
  FredokaOne_400Regular: 'string',
}));

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});
