import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {render, fireEvent} from '@testing-library/react-native';

import {Input} from '../src/components/Input';

describe('Input Component', () => {
  it('should render input correctly', () => {
    renderer.create(
      <Input
        inputValue=""
        placeholder="First Name"
        handleTextChange={() => ({})}
      />,
    );
  });

  it('should be able to enter a value by typing', () => {
    const {getByTestId} = render(
      <Input
        inputValue=""
        placeholder="First Name"
        handleTextChange={() => ({})}
      />,
    );

    const input = getByTestId('input_component');

    fireEvent.changeText(input, 'test input value');
    expect(input.props.value).toEqual('test input value');
  });

  it('should be able to enter a value by passing by parameters', () => {
    const {getByTestId} = render(
      <Input
        inputValue="test input value"
        placeholder="First Name"
        handleTextChange={() => ({})}
      />,
    );

    const input = getByTestId('input_component');
    expect(input.props.value).toEqual('test input value');
  });
});
