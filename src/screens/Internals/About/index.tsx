import React from 'react';
import {ScrollView, Text} from 'react-native';

import {useGlobalContext} from '../../../hooks/context';
import {DefaultScreenTitle, styles} from '../../../commonStyles';

export function About() {
  const {setUserData} = useGlobalContext();

  function handleLogout() {
    setUserData({name: '', isAuthenticated: false});
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewBottom}
        showsVerticalScrollIndicator={false}>
        <DefaultScreenTitle> About </DefaultScreenTitle>
        <Text onPress={() => handleLogout()}>Click to Logout</Text>
      </ScrollView>
    </>
  );
}
