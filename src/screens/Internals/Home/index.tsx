import React from 'react';
import {ScrollView} from 'react-native';

import {DefaultScreenTitle, styles} from '../../../commonStyles';
import {useGlobalContext} from '../../../hooks/context';

export function Home() {
  const {userData} = useGlobalContext();

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewBottom}
        showsVerticalScrollIndicator={false}>
        <DefaultScreenTitle> Hello, {userData?.name}! </DefaultScreenTitle>
      </ScrollView>
    </>
  );
}
