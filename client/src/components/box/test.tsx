import React from 'react';
import { Image, Text, View } from 'react-native';
import renderer from 'react-test-renderer';

import ComponentMock from '../../mocks/componentMock';
import LayoutBox from './';
const FileMock = require('../../mocks/fileMock');

import Styled from './styles';

describe('LayoutBox', () => {
  it('renders without crashing', () => {
    const rendered = renderer
      .create(
        <LayoutBox>
          <ComponentMock />
          <ComponentMock />
        </LayoutBox>,
      )
      .toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders default styles', () => {
    const rendered = renderer.create(
      <LayoutBox>
        <ComponentMock />
        <ComponentMock />
      </LayoutBox>,
    );

    const element = rendered.root.findByType(View);
    const elementTitle = element.findAllByProps({ style: Styled.title });

    expect(element.props.style.includes(Styled.centered)).toBe(false);
    expect(elementTitle.length).toBe(0);
  });

  it('renders centered style', () => {
    const rendered = renderer.create(
      <LayoutBox centered>
        <ComponentMock />
        <ComponentMock />
      </LayoutBox>,
    );

    const element = rendered.root.findByType(View);
    expect(element.props.style.includes(Styled.centered)).toBe(true);
  });

  it('renders with title', () => {
    const rendered = renderer.create(
      <LayoutBox title={'Foo'}>
        <ComponentMock />
        <ComponentMock />
      </LayoutBox>,
    );

    const element = rendered.root.findByType(View);
    const elementTitle = element.findAll((n: any) => n.type === View && n.props.style === Styled.title);
    const elementTitleIcon = element.findAll((n: any) => n.type === Image && n.props.style === Styled.icon);
    const elementTitleText = element.findAll((n: any) => n.type === Text && n.props.style === Styled.titleText);

    expect(elementTitle.length).toBe(1);
    expect(elementTitleIcon.length).toBe(0);
    expect(elementTitleText.length).toBe(1);
    expect(elementTitleText[0].props.children).toEqual('Foo');
  });

  it('renders with icon', () => {
    const rendered = renderer.create(
      <LayoutBox icon={FileMock}>
        <ComponentMock />
        <ComponentMock />
      </LayoutBox>,
    );

    const element = rendered.root.findByType(View);
    const elementTitle = element.findAll((n: any) => n.type === View && n.props.style === Styled.title);
    const elementTitleIcon = element.findAll((n: any) => n.type === Image && n.props.style === Styled.icon);
    const elementTitleText = element.findAll((n: any) => n.type === Text && n.props.style === Styled.titleText);

    expect(elementTitle.length).toBe(1);
    expect(elementTitleIcon.length).toBe(1);
    expect(elementTitleText.length).toBe(0);
    expect(elementTitleIcon[0].props.source).toEqual(FileMock);
  });

  it('renders with title and icon', () => {
    const rendered = renderer.create(
      <LayoutBox title={'Foo'} icon={FileMock}>
        <ComponentMock />
        <ComponentMock />
      </LayoutBox>,
    );

    const element = rendered.root.findByType(View);
    const elementTitle = element.findAll((n: any) => n.type === View && n.props.style === Styled.title);
    const elementTitleIcon = element.findAll((n: any) => n.type === Image && n.props.style === Styled.icon);
    const elementTitleText = element.findAll((n: any) => n.type === Text && n.props.style === Styled.titleText);

    expect(elementTitle.length).toBe(1);
    expect(elementTitleIcon.length).toBe(1);
    expect(elementTitleText.length).toBe(1);
    expect(elementTitleIcon[0].props.source).toEqual(FileMock);
    expect(elementTitleText[0].props.children).toEqual('Foo');
  });
});
