import {View, Text} from 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import {BottomModal} from '../src/components/BottomModal';

describe('Component BottomModal', () => {
  const children = () => (
    <View>
      <Text> Enter the invitation code you received from your employer.</Text>
    </View>
  );

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should open the bottom modal when invoked', () => {
    const {getByTestId} = render(
      <BottomModal
        id="bottomModal"
        height={200}
        showModal={true}
        closeModal={() => {}}>
        {children()}
      </BottomModal>,
    );

    jest.advanceTimersByTime(500);

    const bottomModalElement = getByTestId('bottomModal');
    const animatedContainerElement = getByTestId('animatedContainer');

    expect(bottomModalElement.props.visible).toEqual(true);
    expect(animatedContainerElement.props.style.top).toEqual(0);
  });

  it('should close the bottom modal by pressing out of the limitations of its view', () => {
    let showModal = true;

    const mockedHandleClose = jest.fn(() => (showModal = false));

    const {getByTestId, rerender} = render(
      <BottomModal
        id="bottomModal"
        height={200}
        showModal={showModal}
        closeModal={mockedHandleClose}>
        {children()}
      </BottomModal>,
    );

    // add a timer until the bottom modal slide-up animation ends
    jest.advanceTimersByTime(500);

    fireEvent.press(getByTestId('containerBackground'));

    // add a timer until the modal slide-down animation ends
    jest.advanceTimersByTime(500);

    const element = getByTestId('animatedContainer');
    expect(element.props.style.top).toEqual(210);

    rerender(
      <BottomModal
        id="bottomModal"
        height={200}
        showModal={showModal}
        closeModal={mockedHandleClose}>
        {children()}
      </BottomModal>,
    );

    const elementModal = getByTestId('bottomModal');
    expect(elementModal.props.visible).toEqual(false);
  });
});
