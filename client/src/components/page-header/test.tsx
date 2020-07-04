import React from 'react';
import renderer from 'react-test-renderer';

import PageHeader from './';

describe('PageHeader', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<PageHeader title={'Foo'} />).toJSON()).toBeTruthy();
  });
});
