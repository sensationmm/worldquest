import React from 'react';
import renderer from 'react-test-renderer';

import Profile from './Profile';

describe('Profile Container', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<Profile />).toJSON()).toBeTruthy();
  });
});
