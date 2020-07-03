import React from 'react';
import LayoutMain from './';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<LayoutMain />).toJSON();
  expect(rendered).toBeTruthy();
});
