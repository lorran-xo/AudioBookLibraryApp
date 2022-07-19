import React from 'react';
import {View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import {CommonRoutes} from '../routes/common.routes';
import {MenuBar} from '../routes/menuBar.routes';
// import {styles} from '../styles/commonstyles';
// import {Toast, ToastData} from '../components/Toast';
// import {useAuth} from '../hooks/auth';

type CommonScreensType = {
  screen?: 'AudioPlayer';
  params?: any;
};

export type AppStackParamList = {
  MenuBar: undefined;
  // CommonRoutes: CommonScreensType;
};

const {Navigator, Screen} = createNativeStackNavigator<AppStackParamList>();

export function AppRoutes() {
//   const {toastData, setToastData} = useAuth();

//   function clearToastData() {
//     setToastData({} as ToastData);
//   }

  return (
    <>
      <Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          orientation: 'portrait',
        }}>
        <Screen name="MenuBar" component={MenuBar} />
        {/* <Screen name="CommonRoutes" component={CommonRoutes} /> */}
      </Navigator>
      {/* 
      <View style={styles.toasterContainer}>
        <Toast toastData={toastData} clearToastData={clearToastData} />
      </View> */}
    </>
  );
}
