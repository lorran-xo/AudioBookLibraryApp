import styled, { css } from 'styled-components';
import { TextInput, View, Text, Platform } from 'react-native';

import { Theme } from '../../theme';

interface TextInputProps {
  active: boolean;
  editable?: boolean;
}

export const Container = styled(View)``;

export const InputWrapper = styled(View) <TextInputProps>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  border-radius: 5px;
`;

export const StyledInput = styled(TextInput) <TextInputProps>`
  flex: 1;
  font-size: ${Theme.fontSize.font16}px;
  font-weight: ${Theme.fontWeight.regular};

  ${props =>
    css`
      background-color: ${!props.editable && Theme.colors.disabledInput};
    `}

  ${props =>
    props.editable &&
    css`
      background-color: ${props.active
        ? Theme.colors.focused
        : Theme.colors.unfocused};
    `}

  height: 54px;
  border-radius: 5px;

  color: ${Theme.colors.textPrimary};

  padding: 16px 0 2px ${Theme.metrics.screenWidth * 0.043}px;

  ${Platform.OS === 'ios' &&
  css`
    padding-top: 20px;
  `}
`;

export const InputAlertText = styled(Text)`
  position: absolute;
  margin: 3px;

  font-weight: ${Theme.fontWeight.regular};
  font-size: ${Theme.fontSize.font12}px;
  color: ${Theme.colors.textError};
  line-height: 20px;
`;
