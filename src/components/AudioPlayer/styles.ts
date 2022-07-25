import styled from 'styled-components';
import {View, Text, TouchableOpacity, Platform} from 'react-native';

import {Theme} from '../../theme';

export const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: space-between;

  padding: 0 ${Theme.metrics.screenHeight * 0.01}px 0;

  background-color: ${Theme.colors.filled};
`;

export const PlayerHeader = styled(View)`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 2;

  margin-top: ${Theme.metrics.screenHeight * 0.068}px;
`;

export const AudioTexts = styled(View)`
  flex: 3;
  flex-direction: column;
  align-items: center;

  margin-right: ${Theme.metrics.screenHeight * 0.055}px;
`;

export const TitleText = styled(Text)`
  font-weight: ${Theme.fontWeight.regular};
  font-size: ${Theme.fontSize.font16}px;
  color: ${Theme.colors.white};
  line-height: 19px;

  margin-top: ${Theme.metrics.screenHeight * 0.0052}px;
`;

export const SubtitleText = styled(Text)`
  font-weight: ${Theme.fontWeight.regular};
  font-size: ${Theme.fontSize.font12}px;
  color: ${Theme.colors.white};
  line-height: 25px;
`;

export const TimerText = styled(Text)`
  font-weight: ${Theme.fontWeight.regular};
  font-size: ${Theme.fontSize.font32}px;
  color: ${Theme.colors.white};
  line-height: 40px;
`;

export const PlayerBottom = styled(View)`
  height: 153px;
  width: ${Theme.metrics.screenWidth}px;

  border-radius: 20px;

  background-color: #00000040;
`;

export const ActionsWrapper = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  bottom: ${Platform.OS === 'ios' ? 20 : 0}px;
`;

export const PlayerButtons = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const PlayIconWrapper = styled(TouchableOpacity)`
  margin: ${Theme.metrics.screenHeight * 0.053}px;
`;

