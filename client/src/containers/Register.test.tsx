import React from 'react';
import renderer from 'react-test-renderer';

import Register from './Register';

describe('Register Container', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<Register />).toJSON()).toBeTruthy();
  });
});
