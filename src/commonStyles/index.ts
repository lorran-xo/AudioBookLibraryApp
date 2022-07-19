import styled from 'styled-components';
import {StyleSheet, Text, View} from 'react-native';
import {Theme} from '../theme';

export const DefaultScreenTitle = styled(Text)`
  font-family: ${Theme.font.graphikmedium};
  font-weight: ${Theme.fontWeight.medium};
  font-size: ${Theme.fontSize.font22}px;
  color: ${Theme.colors.black};
  line-height: 23px;
  align-self: center;
  margin-top: 72px;
`;

export const TitleText = styled(Text)`
  margin-top: ${Theme.metrics.screenHeight * 0.021}px;
  font-family: ${Theme.font.graphiksemibold};
  font-weight: ${Theme.fontWeight.bold};
  font-size: ${Theme.fontSize.font24}px;
  color: ${Theme.colors.white};
  line-height: 40px;
`;

export const DescriptionText = styled(Text)`
  margin-top: ${Theme.metrics.screenHeight * 0.031}px;
  font-family: ${Theme.font.graphikregular};
  font-weight: ${Theme.fontWeight.regular};
  font-size: ${Theme.fontSize.font15}px;
  color: ${Theme.colors.white};
  opacity: 0.7;
  line-height: 18px;
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
