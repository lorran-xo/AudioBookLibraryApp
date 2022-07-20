import React from 'react';

import {AppRoutes} from './app.routes'; // Internal routes of the app, when the user has already logged in.
import {AuthRoutes} from './auth.routes'; // External routes of the app, before the user logs in;
import {useGlobalContext} from '../hooks/context';

export function Routes() {
const {userData} = useGlobalContext();

  return (
    <>
      {userData?.isAuthenticated ? (
        <AppRoutes />
      ) : (
        <AuthRoutes />
      )}
    </>
  );
}
