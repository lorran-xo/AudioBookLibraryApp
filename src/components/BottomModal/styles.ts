import styled from 'styled-components';
import {TouchableOpacity, Animated, View} from 'react-native';

import {Theme} from '../../theme';

export const Container = styled(TouchableOpacity)`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0);
`;

export const ContainerAnimated = styled(Animated.View)`
  background-color: #ffffff;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

export const HorizontalSeparatorWrapper = styled(View)`
  align-items: center;
  margin-top: 14px;
`;

export const HorizontalSeparator = styled(View)`
  height: 6px;
  width: 78px;
  border-radius: 3px;
  background-color: ${Theme.colors.black};
  opacity: 0.15;
`;

export const ChildrenWrapper = styled(View)`
  margin: 32px;
`;
