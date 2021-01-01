import React from 'react';
import renderer from 'react-test-renderer';

import { BaseProps } from './Home.test';
import Info from './Info';

describe('Info Container', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<Info {...BaseProps} />).toJSON()).toBeTruthy();
  });
});
