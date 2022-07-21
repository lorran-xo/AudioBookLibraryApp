import styled from 'styled-components';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Theme } from '../../../theme';

export const OptionArea = styled(View)`
  background-color: ${Theme.colors.white};

  margin: 10px;
  padding: 25px 18px 25px 18px;
  border-radius: 15px;
  margin-top: 24px;
`;

export const TouchableOption = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const IconWrapper = styled(View)`
  margin-right: 24px;
`;

export const OptionText = styled(Text)`
  font-weight: ${Theme.fontWeight.bold};
  font-size: ${Theme.fontSize.font15}px;
  color: ${Theme.colors.textPrimary};
  line-height: 25px;
`;

export const OptionTopSpacing = styled(View)`
  margin-top: 26px;
`;
