import React from 'react';
import LayoutBox from './';

import Mock from '../../mocks/componentMock';

import renderer from 'react-test-renderer';

describe('LayoutBox', () => {
  it('renders without crashing', () => {
    const rendered = renderer
      .create(
        <LayoutBox>
          <Mock />
          <Mock />
        </LayoutBox>
      )
      .toJSON();
    expect(rendered).toBeTruthy();
  });
});
