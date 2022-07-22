// Routes that are common to the whole app and should appear over menu bar.
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AudioPlayerScreen} from '../screens/Internals/Commons/AudioPlayer';
import {AudioPlayerProps} from '../components/AudioPlayer/types';

type CommonStackParamList = {
  AudioPlayerScreen: {audioPlayerData: AudioPlayerProps};
};

const CommonStack = createNativeStackNavigator<CommonStackParamList>();

export function CommonRoutes(parameters: any) {
  const {route} = parameters;

  return (
    <CommonStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
        orientation: 'portrait',
      }}>
      <CommonStack.Screen
        name="AudioPlayerScreen"
        component={AudioPlayerScreen}
        initialParams={route.params}
      />
    </CommonStack.Navigator>
  );
}
