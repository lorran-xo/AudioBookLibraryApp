import styled from 'styled-components';
import { View } from 'react-native';
import { Theme } from '../../../theme';

export const Container = styled(View)`
  flex: 1;
  background-color: ${Theme.colors.white};
`;

export const SliderContainer = styled(View)`
  margin-top: 16px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SliderWrapper = styled(View)`
  margin-top: 40px;
`;
