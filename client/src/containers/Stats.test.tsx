import React from 'react';
import renderer from 'react-test-renderer';

import { BaseProps } from './Home.test';
import Stats from './Stats';

describe('Stats Container', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<Stats {...BaseProps} />).toJSON()).toBeTruthy();
  });
});
