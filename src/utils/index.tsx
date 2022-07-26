import React, {DependencyList, useEffect} from 'react';
import {ActivityIndicator, BackHandler, View} from 'react-native';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {ActivityIndicatorStyle} from '../commonStyles';
import {Theme} from '../theme';

export function renderLoading(): JSX.Element {
  console.debug('renderLoading()');

  return (
    <View
      style={[
        ActivityIndicatorStyle.container,
        ActivityIndicatorStyle.horizontal,
      ]}>
      <ActivityIndicator size="large" color={Theme.colors.logo} />
    </View>
  );
}

export function getMinimalTouchableArea(width: number, height: number) {
  // Get the minimum touchable area for buttons (38px) - slop
  let remainingWidthArea,
    remainingHeightArea = 0;

  if (width < 38) {
    remainingWidthArea = 38 - width;
  }

  if (height < 38) {
    remainingHeightArea = 38 - height;
  }

  const increasedTouchableArea = {
    top: remainingHeightArea,
    left: remainingWidthArea,
    right: remainingWidthArea,
    bottom: remainingHeightArea,
  };

  return increasedTouchableArea;
}

export function getBackButtonDimensions(dimension: 'width' | 'height') {
  // Get width and height of back button for responsivity and SVG resolution purposes
  if (dimension === 'width') {
    return Theme.metrics.screenWidth * 0.085;
  }

  if (dimension === 'height') {
    return Theme.metrics.screenHeight * 0.0395;
  }
}

export const BackButtonWidth = getBackButtonDimensions('width');

export const BackButtonHeight = getBackButtonDimensions('height');

export const BackButtonTouchableArea = getMinimalTouchableArea(
  BackButtonWidth || 32,
  BackButtonHeight || 32,
);

export const CloseButtonTouchableArea = getMinimalTouchableArea(36, 36);

export function OnSwipingOrPressingBack<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList & string,
>(onGoBackCallback: () => boolean | null | undefined, deps?: DependencyList) {
  // Handles physical back button and backswipe for iOS and Android devices

  const navigation =
    useNavigation<NativeStackNavigationProp<ParamList, RouteName>>();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onGoBackCallback);
    navigation?.addListener('gestureEnd', onGoBackCallback);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onGoBackCallback);
      navigation?.removeListener('gestureEnd', onGoBackCallback);
    };
    // eslint disabled because dependency array should be empty so this will run only on 'going back' actions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function adjustIosFontSize(
  event: any,
  numberOfLines: number,
  fontSize: number,
): number {
  const {lines} = event.nativeEvent;

  if (lines.length > numberOfLines) {
    return fontSize - 1;
  }

  return fontSize;
}

export function matchNumberInString(text: string): boolean {
  // regex that matches if a string contains number
  if (text.match(/\d/)) {
    return true;
  } else {
    return false;
  }
}
