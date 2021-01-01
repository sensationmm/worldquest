import React from 'react';
import renderer from 'react-test-renderer';

import { BaseProps } from './Home.test';
import Register from './Register';

describe('Register Container', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<Register {...BaseProps} />).toJSON()).toBeTruthy();
  });
});
