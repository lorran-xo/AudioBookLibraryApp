import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, PanResponder} from 'react-native';

import {
  Button,
  Container,
  Description,
  TextWrapper,
  Title,
  ToastIcon,
} from './styles';

import {ToastType} from '../types';
import CircleChecked from '../../../assets/icons/CircleChecked.svg';
import WarningIcon from '../../../assets/icons/WarningIcon.svg';
import CancelIcon from '../../../assets/icons/CancelIcon.svg';
import {Theme} from '../../../theme';

const {width} = Dimensions.get('window');

interface Props {
  id: string;
  title: string;
  label?: string;
  type: ToastType;
  delay?: number;
  onHide: (args: string) => void;
}

export function AnimatedText({
  id,
  title,
  label = '',
  type,
  delay = 3000,
  onHide,
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(delay),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => onHide(id));
    // eslint disabled because having dependencies will mess with toast timing & animation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderMove: (evt, gestureState) => {
      Animated.event([null, {dx: translateX}], {useNativeDriver: false})(
        evt,
        gestureState,
      );
    },

    onPanResponderRelease: (evt, gestureState) => {
      const {dx} = gestureState;

      if (Math.abs(dx) >= 0.2 * width) {
        Animated.timing(translateX, {
          toValue: dx > 0 ? width : -width,
          duration: 200,
          useNativeDriver: true,
        }).start(() => onHide(id));

        return;
      }

      Animated.timing(translateX, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    },
  });

  const styleContainer = {
    opacity,
    elevation: 6,
    transform: [
      {
        scale: opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        }),
      },
      {translateX},
    ],
  };

  function renderStatusIcon(icon: ToastType) {
    let svgWidth = Theme.metrics.screenWidth * 0.064;
    let svgHeight = Theme.metrics.screenHeight * 0.0296;

    const iconList = {
      success: (
        <CircleChecked fill={Theme.colors.white} width={svgWidth} height={svgHeight} />
      ),
      error: <CancelIcon width={svgWidth} height={svgHeight} />,
      warning: <WarningIcon width={svgWidth} height={svgHeight} />,
    };

    return <ToastIcon hasLabel={!!label}>{iconList[icon]}</ToastIcon>;
  }

  return (
    <Container style={styleContainer} {...panResponder.panHandlers}>
      <Button
        activeOpacity={0.6}
        type={type}
        hasLabel={!!label}
        onPress={() => onHide(id)}>
        {renderStatusIcon(type)}

        {label ? (
          <TextWrapper>
            <Title>{title}</Title>

            <Description>{label}</Description>
          </TextWrapper>
        ) : (
          <Title>{title}</Title>
        )}
      </Button>
    </Container>
  );
}
