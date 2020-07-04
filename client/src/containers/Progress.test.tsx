import React from 'react';
import renderer from 'react-test-renderer';

import Progress from './Progress';

describe('Progress Container', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<Progress />).toJSON()).toBeTruthy();
  });
});
