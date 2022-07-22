import styled from 'styled-components';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Theme } from '../../../theme';

export const AboutContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;

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

export const NameInputContainer = styled(View)`
  margin-top: 50px; 
  margin-right: 10px;
  margin-left: 10px;
`;

export const RandomQuoteWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const InfoIconWrapper = styled(TouchableOpacity)`
  margin-right: 5px;
  margin-left: 5px;
`;

export const AboutBottomText = styled(View)`
  align-items: center;
`;
