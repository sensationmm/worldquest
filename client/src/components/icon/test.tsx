import React from 'react';
import renderer from 'react-test-renderer';

import Icon from './';

describe('Icon', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Icon />).toJSON();
    expect(component).toBeTruthy();
  });
});
