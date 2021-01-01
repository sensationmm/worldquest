import React from 'react';
import renderer from 'react-test-renderer';

import Loader from './';

describe('Loader', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<Loader />).toJSON()).toBeTruthy();
  });
});
