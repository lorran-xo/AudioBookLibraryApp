import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MenuBar} from '../routes/menuBar.routes';
import {CommonRoutes} from '../routes/common.routes';

import { Toast } from '../components/Toast';
import { styles } from '../commonStyles';
import { ToastData } from '../components/Toast/types';
import {useGlobalContext} from '../hooks/context';
import { AudioPlayerProps } from '../components/AudioPlayer/types';
import { Routes } from '../../Constants';

type CommonScreensType = {
  screen?: 'AudioPlayerScreen';
  params?: AudioPlayerProps;
  comingFrom?: Routes.HomeScreen | Routes.LibraryShelfScreen;
};

export type AppStackParamList = {
  MenuBar: undefined;
  CommonRoutes: CommonScreensType;
};

const {Navigator, Screen} = createNativeStackNavigator<AppStackParamList>();

export function AppRoutes() {
  const {toastData, setToastData} = useGlobalContext();

  function clearToastData() {
    setToastData({} as ToastData);
  }

  return (
    <>
      <Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          orientation: 'portrait',
        }}>
        <Screen name="MenuBar" component={MenuBar} />
        <Screen name="CommonRoutes" component={CommonRoutes} />
      </Navigator>
      
      <View style={styles.toasterContainer}>
        <Toast toastData={toastData} clearToastData={clearToastData} />
      </View>
    </>
  );
}
