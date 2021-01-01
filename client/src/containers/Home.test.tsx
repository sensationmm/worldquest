import React from 'react';
import renderer from 'react-test-renderer';

import Home from './Home';

export const BaseProps = {
  setIsLoading: jest.fn(),
  setIsLoggedIn: jest.fn(),
};

describe('Home Container', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<Home {...BaseProps} />).toJSON()).toBeTruthy();
  });
});
