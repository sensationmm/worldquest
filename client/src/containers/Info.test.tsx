import React from 'react';
import renderer from 'react-test-renderer';

import Info from './Info';

describe('Info Container', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<Info />).toJSON()).toBeTruthy();
  });
});
