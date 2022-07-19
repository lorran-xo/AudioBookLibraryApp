import React from 'react';
import {ScrollView} from 'react-native';

import {DefaultScreenTitle, styles} from '../../../commonStyles';

export function Login() {
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewBottom}
        showsVerticalScrollIndicator={false}>
        <DefaultScreenTitle> Login </DefaultScreenTitle>
      </ScrollView>
    </>
  );
}
