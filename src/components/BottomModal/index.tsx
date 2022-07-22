import React, {useRef, useEffect} from 'react';
import {Modal, Animated, PanResponder} from 'react-native';

import {
  Container,
  ContainerAnimated,
  HorizontalSeparatorWrapper,
  HorizontalSeparator,
  ChildrenWrapper,
} from './styles';

import {Theme} from './../../theme';

interface Props {
  id?: string;
  height: number;
  showModal: boolean;
  children: JSX.Element;
  closeModal: () => void;
}

export function BottomModal({
  id,
  height = Theme.metrics.screenHeight * 0.5,
  showModal,
  children,
  closeModal,
}: Props) {
  const panY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (showModal) {
      resetPositionAnim();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  function resetPositionAnim() {
    Animated.timing(panY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }

  function closeAnim() {
    Animated.timing(panY, {
      toValue: height + 10,
      duration: 100,
      useNativeDriver: false,
    }).start(() => closeModal());
  }

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onMoveShouldSetPanResponder: () => false,

      onPanResponderMove: (evt, gestureState) => {
        Animated.event([null, {dy: panY}], {useNativeDriver: false})(
          evt,
          gestureState,
        );
      },

      onPanResponderRelease: (evt, gestureState) => {
        const {dy} = gestureState;

        if (dy > 0 && dy > height * 0.4) {
          closeAnim();

          return;
        }

        resetPositionAnim();
      },
    }),
  ).current;

  const top = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <Modal
      testID={id}
      animated
      animationType="fade"
      visible={showModal}
      transparent>
      <Container
        testID="containerBackground"
        activeOpacity={1}
        onPress={closeAnim}>
        <ContainerAnimated
          testID="animatedContainer"
          style={{top, height}}
          {...panResponder.panHandlers}>
          <HorizontalSeparatorWrapper>
            <HorizontalSeparator />
          </HorizontalSeparatorWrapper>

          <ChildrenWrapper style={{maxHeight: height - 100}}>
            {children}
          </ChildrenWrapper>
        </ContainerAnimated>
      </Container>
    </Modal>
  );
}
