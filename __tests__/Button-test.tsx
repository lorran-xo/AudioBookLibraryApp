import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react-native';

import {Button} from '../src/components/Button';

describe('Button Component', () => {
  it('should render the button correctly', () => {
    renderer.create(
      <Button title="Enabled" onButtonPress={() => console.log('Pressed!')} />,
    );
  });

  it('should render the text on the button according to the title passed as prop', () => {
    const {getByText} = render(
      <Button title="Enabled" onButtonPress={() => ({})} />,
    );

    const buttonElement = getByText('Enabled');
    expect(buttonElement.props.children).toBe('Enabled');
  });

  it('should call onButtonPress callback function and only once when clicking on the button once', () => {
    const onPress = jest.fn();

    const {getByTestId} = render(
      <Button title="Enabled" onButtonPress={onPress} />,
    );

    fireEvent(getByTestId('button-component'), 'onPress');

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
