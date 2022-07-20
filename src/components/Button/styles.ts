import styled, {css} from 'styled-components';
import {Text, TouchableHighlight} from 'react-native';

import {Theme} from '../../theme';

interface ContainerProps {
  disabled?: boolean;
  width?: number;
}

export const Container = styled(TouchableHighlight)<ContainerProps>`
  width: ${({width}) => (width ? width : Theme.metrics.screenWidth * 0.87)}px;
  height: 48px;

  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-radius: 25px;
  justify-content: flex-end;
  border-color: #2B5C8E95;

  background-color: #2B5C8E95;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.6;
    `}

  ${props =>
    !props.disabled &&
    css`
      elevation: 2;
    `}
`;

export const Title = styled(Text)<ContainerProps>`
  color: ${Theme.colors.white};

  font-size: ${Theme.fontSize.font15}px;
  font-weight: ${Theme.fontWeight.semi};

  ${props =>
    props.disabled &&
    css`
      opacity: 0.8;
    `}

  margin-bottom: 14px;
`;
