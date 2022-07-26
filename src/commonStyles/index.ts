import styled from 'styled-components';
import { StyleSheet, Text, View } from 'react-native';
import { Theme } from '../theme';

export const DefaultContainer = styled(View)`
  flex: 1;
  flex-direction: column;
`;

export const DefaultScreenTitle = styled(Text)`
  font-weight: ${Theme.fontWeight.medium};
  font-size: ${Theme.fontSize.font22}px;
  color: ${Theme.colors.black};
  line-height: 23px;

  align-self: center;
  margin-top: 72px;
`;

export const DefaultText = styled(Text)`
  text-align: center;
  font-weight: ${Theme.fontWeight.regular};
  font-size: ${Theme.fontSize.font15}px;
  color: ${Theme.colors.textPrimary};
  line-height: 19px;
  margin-top: 14px;

  width: ${Theme.metrics.screenWidth - 100}px;
`;

export const AbsolutePositioning = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const TopBackground = styled(View)`
  flex: 0.6;
  background-color: #e3e3e3;
`;

export const BottomBackground = styled(View)`
  flex: 1;
  background-color: ${Theme.colors.ultraLightGray};
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
  bookCover: {
    width: '100%',
    height: '100%'
  },
  bookCoverError: {
    width: '90%',
    height: '100%',
  }
});
