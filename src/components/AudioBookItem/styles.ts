import styled from 'styled-components';
import {Text, View, TouchableOpacity} from 'react-native';
import {Theme} from '../../theme';

export const Container = styled(TouchableOpacity)`
  width: 226px;
  height: 212px;
`;

export const BookCoverWrapper = styled(View)`
  width: 100%;
  height: 160px;
  overflow: hidden;

  border-radius: 5px;
`;

export const BookName = styled(Text)`
  margin-top: 8px;
  padding: 0px 3px 0px 3px;

  color: ${Theme.colors.textPrimary};
  font-size: ${Theme.fontSize.font15}px;
  font-weight: ${Theme.fontWeight.medium};
  line-height: 21px;

  width: 100%;
  height: 44px;
`;
