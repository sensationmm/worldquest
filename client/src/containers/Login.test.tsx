import React from 'react';
import renderer from 'react-test-renderer';

import Login from './Login';

describe('Login Container', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<Login />).toJSON()).toBeTruthy();
  });
});
