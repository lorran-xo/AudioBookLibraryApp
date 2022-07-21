import styled from 'styled-components';
import {View, StyleSheet} from 'react-native';

export const Container = styled(View)`
  align-items: center;
  width: 100%;
`;

export const SliderContainer = styled(View)`
  width: 100%;
`;

export const ItemContainer = styled(View)`
  width: 226px;
  height: 212px;

  margin-left: 16px;
`;

export const styleSheet = StyleSheet.create({
  lastItemPadding: {
    paddingRight: 16,
  },
});
