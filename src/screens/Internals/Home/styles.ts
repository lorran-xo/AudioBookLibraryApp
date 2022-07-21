import styled from 'styled-components';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Theme } from '../../../theme';

const OS = Platform.OS;

interface TextProps {
    fontSize: number;
}

export const Container = styled(View)`
  flex: 1;
  flex-direction: column;
`;

export const HeaderBackground = styled(View)`
  flex: 0.6;
  background-color: #e3e3e3;
`;

export const BodyBackground = styled(View)`
  flex: 1;
  background-color: ${Theme.colors.ultraLightGray};
`;

export const ContentView = styled(View)`
  align-self: center;
`;

export const IntroWrapper = styled(View)`
  align-items: center;
`;

export const GreetingView = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 88px;

  width: ${Theme.metrics.screenWidth - 100}px;
`;

export const GreetingText = styled(Text) <TextProps>`
  font-size: ${({ fontSize }) =>
        OS === 'ios' ? fontSize : Theme.fontSize.font30}px;
  color: ${Theme.colors.textPrimary};
  line-height: 36px;
`;

export const NameText = styled(Text) <TextProps>`
  font-weight: ${Theme.fontWeight.medium};
  font-size: ${({ fontSize }) =>
        OS === 'ios' ? fontSize : Theme.fontSize.font30}px;

  color: ${Theme.colors.filled};
  line-height: 36px;
`;

export const BookCoverContainer = styled(View)`
  justify-content: space-between;

  width: 327px;
  height: 515px;
  margin-top: 25px;
  border-radius: 15px;
  overflow: hidden;
`;


export const BookCoverBottom = styled(View)`
  background-color: rgba(255, 255, 255, 0.7);
  align-items: center;
  border-top-width: 1px;
  border-top-color: rgba(255, 255, 255, 0.2);

  height: 172px;
`;

export const RecWrapper = styled(View)`
  flex-direction: column;
  width: 257px;
  height: 100px;
  justify-content: center;
`;

export const RecText = styled(Text)`
  font-weight: ${Theme.fontWeight.medium};
  font-size: ${Theme.fontSize.font16}px;
  color: ${Theme.colors.textPrimary};
  line-height: 19px;

  margin-top: 15px;
`;

export const ListenButtonWrapper = styled(View)`
  margin-bottom: ${Theme.metrics.screenHeight * 0.01}px;
`;
