import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Login} from '../screens/Externals/Login';

export type AuthStackParamList = {
  Login: undefined;
};

const {Navigator, Screen} = createNativeStackNavigator<AuthStackParamList>();

export function AuthRoutes() {
    // const {toastData, setToastData} = useAuth();

  return (
    <>
      <Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          orientation: 'portrait',
        }}>
        <Screen name="Login" component={Login} />
      </Navigator>
        {/* 
      <View style={styles.toasterContainer}>
        <Toast toastData={toastData} clearToastData={clearToastData} />
      </View> */}
    </>
  );
}
