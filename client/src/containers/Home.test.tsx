import React from 'react';
import renderer from 'react-test-renderer';

import Home from './Home';

describe('Home Container', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<Home />).toJSON()).toBeTruthy();
  });
});
