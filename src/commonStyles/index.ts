import styled from 'styled-components';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '../theme';

export const Container = styled(View)`
  flex: 1;

  padding: 0 ${Theme.metrics.screenHeight * 0.02}px 0
  ${Theme.metrics.screenHeight * 0.02}px;

  background-color: ${Theme.colors.ultraLightGray};
`;

export const DefaultScreenTitle = styled(Text)`
  font-weight: ${Theme.fontWeight.medium};
  font-size: ${Theme.fontSize.font22}px;
  color: ${Theme.colors.black};
  line-height: 23px;

  align-self: center;
  margin-top: 72px;
`;

export const AbsolutePositioning = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ActivityIndicatorStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export const styles = StyleSheet.create({
  toasterContainer: {
    width: '100%',
    position: 'absolute',
  },
  scrollView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  scrollViewBottom: {
    paddingBottom: 100,
  },
});
