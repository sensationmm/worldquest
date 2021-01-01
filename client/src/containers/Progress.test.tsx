import React from 'react';
import renderer from 'react-test-renderer';

import { BaseProps } from './Home.test';
import Progress from './Progress';

describe('Progress Container', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<Progress {...BaseProps} />).toJSON()).toBeTruthy();
  });
});
