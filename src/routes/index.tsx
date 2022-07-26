import React, {useState, useEffect} from 'react';
import MMKVStorage from 'react-native-mmkv-storage';

import {AppRoutes} from './app.routes'; // Internal routes of the app, when the user has already logged in.
import {AuthRoutes} from './auth.routes'; // External routes of the app, before the user logs in;
import {useGlobalContext} from '../hooks/context';
import {LocalStorageKeys} from '../../Constants';
import {renderLoading} from '../utils';

const localStorage = new MMKVStorage.Loader().initialize();

export function Routes() {
  const {userData, login, logout} = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    verifyCredentials();
  }, []);

  async function verifyCredentials() {
    await localStorage
      .getMapAsync(LocalStorageKeys.currentUserStateKey)
      .then(value => {
        if (value) {
          login(value?.name);
        } else {
          logout();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <>
      {isLoading ? (
        renderLoading()
      ) : userData?.isAuthenticated ? (
        <AppRoutes />
      ) : (
        <AuthRoutes />
      )}
    </>
  );
}
