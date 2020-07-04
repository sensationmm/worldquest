import React from 'react';
import renderer from 'react-test-renderer';

import FormInput from './';

describe('FormInput', () => {
  it('renders without crashing', () => {
    expect(renderer.create(<FormInput label={'Foo'} value={'Foo'} onChange={jest.fn()} />).toJSON()).toBeTruthy();
  });
});
