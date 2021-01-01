import React from 'react';
import renderer from 'react-test-renderer';

import { BaseProps } from './Home.test';
import Login from './Login';

describe('Login Container', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<Login {...BaseProps} />).toJSON()).toBeTruthy();
  });
});
