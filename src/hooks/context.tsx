import React, {createContext, useContext, useState} from 'react';

import {ToastData} from '../components/Toast';
import {ContextProviderType, ContextUserType} from './types';

interface ContextDataType {
  userData: ContextUserType;
  setUserData: (args: ContextUserType) => void;
  toastData: ToastData;
  setToastData: (args: ToastData) => void;
}

const AuthContext = createContext({} as ContextDataType);

function ContextProvider({children}: ContextProviderType) {
  const [userData, setUserData] = useState<ContextUserType>({} as ContextUserType);
  const [toastData, setToastData] = useState<ToastData>({} as ToastData);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        toastData,
        setToastData,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useGlobalContext() {
  return useContext(AuthContext);
}

export {ContextProvider, useGlobalContext};
