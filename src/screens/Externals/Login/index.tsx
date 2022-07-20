import React from 'react';
import {ScrollView} from 'react-native';

import {DefaultScreenTitle, styles} from '../../../commonStyles';
import {useGlobalContext} from '../../../hooks/context';

export function Login() {
  const {setUserData} = useGlobalContext();

  function handleLogin() {
    setUserData({name: 'Lorran', isAuthenticated: true});
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewBottom}
        showsVerticalScrollIndicator={false}>
        <DefaultScreenTitle onPress={() => handleLogin()}>
          Click to Login
        </DefaultScreenTitle>
      </ScrollView>
    </>
  );
}
