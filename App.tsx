import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {ContextProvider} from './src/hooks/context';
import {Routes} from './src/routes';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <ContextProvider>
        <Routes />
      </ContextProvider>
    </NavigationContainer>
  );
};

export default App;
