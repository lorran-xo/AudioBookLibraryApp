{
  /*
    ### DATA FLOW ###

  User presses to login -> App verifies if provided name is valid -> If so, calls the API to retrieve audiobooks data and store it, only after this user is logged in (hooks/context.tsx/login()).
  User closes and opens the App again -> App verifies if 'isAuthenticated' is true on LocalStorage (routes/index.tsx) -> If so, it means user is already logged in so the API is called again to retrieve audiobooks data and then user automatically logs in.
  User presses to logout -> App deletes LocalStorage and Context so this data-flow is restarted (hooks/context.tsx/logout()).
*/
}

import React, {createContext, useContext, useState} from 'react';
import MMKVStorage from 'react-native-mmkv-storage';
import {LocalStorageKeys} from '../../Constants';

import {ToastData} from '../components/Toast/types';
import {Services} from '../services/services';
import {
  ContextProviderType,
  ContextUserType,
  ContextAudiobooksDataType,
} from './types';

const localStorage = new MMKVStorage.Loader().initialize();

interface ContextDataType {
  userData: ContextUserType;
  setUserData: (args: ContextUserType) => void;
  audioLibraryData: ContextAudiobooksDataType;
  setAudioLibraryData: (args: ContextAudiobooksDataType) => void;
  login(userName: string): Promise<void>;
  logout(): Promise<void>;
  toastData: ToastData;
  setToastData: (args: ToastData) => void;
}

const AuthContext = createContext({} as ContextDataType);

function ContextProvider({children}: ContextProviderType) {
  const [userData, setUserData] = useState<ContextUserType>(
    {} as ContextUserType,
  );
  const [audioLibraryData, setAudioLibraryData] =
    useState<ContextAudiobooksDataType>({} as ContextAudiobooksDataType);
  const [toastData, setToastData] = useState<ToastData>({} as ToastData);

  async function login(userName: string) {
    await getData().then(() => {
      let currentUserState = {
        name: userName,
        isAuthenticated: true,
      };

      localStorage.setMap(
        LocalStorageKeys.currentUserStateKey,
        currentUserState,
      );

      setUserData({
        name: userName,
        isAuthenticated: true,
      } as ContextUserType);

      console.debug('logged in successfully');
    });
  }

  async function getData() {
    const response = Services.getRequest(
      'https://librivox.org/api/feed/audiobooks/?format=json',
    );

    const parsedData = await (await response).json();

    setAudioLibraryData({...parsedData});
    console.debug('got audiobooks data successfully');
  }

  async function logout() {
    setUserData({name: '', isAuthenticated: false} as ContextUserType);
    localStorage.clearStore();
  }

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        audioLibraryData,
        setAudioLibraryData,
        login,
        logout,
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
