import React from 'react';
import renderer from 'react-test-renderer';

import Button from './';

describe('Button', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<Button label={'Foo'} onClick={jest.fn()} />).toJSON()).toBeTruthy();
  });
});
