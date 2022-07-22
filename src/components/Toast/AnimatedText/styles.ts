import styled, { css } from 'styled-components';
import { Animated, Text, TouchableOpacity, View, Platform } from 'react-native';

import { Theme } from '../../../theme';
import { ToastType } from '../types';

interface ButtonProps {
  type?: ToastType;
  hasLabel: boolean;
}

export const Container = styled(Animated.View)``;

export const Button = styled(TouchableOpacity) <ButtonProps>`
  ${({ hasLabel }) =>
    hasLabel &&
    css`
      height: ${Theme.metrics.screenHeight * 0.18}px;
    `}

  ${({ hasLabel }) =>
    Platform.OS === 'ios' &&
    !hasLabel &&
    css`
      height: ${Theme.metrics.screenHeight * 0.11}px;
    `}

  ${({ hasLabel }) =>
    Platform.OS === 'android' &&
    !hasLabel &&
    css`
      height: ${Theme.metrics.screenHeight * 0.14}px;
    `}

  width: 100%;

  padding-top: 7%;
  padding-right: 15%;

  flex-direction: row;
  align-items: center;
  justify-content: ${({ hasLabel }) =>
    hasLabel ? 'space-between' : 'flex-start'};

  ${({ type }) =>
    type === 'success' &&
    css`
      background-color: ${Theme.colors.blue};
    `}

  ${({ type }) =>
    type === 'error' &&
    css`
      background-color: ${Theme.colors.textError};
    `}

  ${({ type }) =>
    type === 'warning' &&
    css`
      background-color: ${Theme.colors.yellowWarning};
    `}
`;

export const TextWrapper = styled(Animated.View)`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;

export const ToastIcon = styled(View) <ButtonProps>`
  margin: 0 16px 0 17px;
`;

export const Title = styled(Text)`
  font-weight: ${Theme.fontWeight.bold};
  font-size: ${Theme.fontSize.font14}px;
  color: ${Theme.colors.white};
  line-height: 22px;
`;

export const Description = styled(Text)`
  font-weight: ${Theme.fontWeight.regular};
  font-size: ${Theme.fontSize.font14}px;
  color: ${Theme.colors.white};
  line-height: 22px;
`;
