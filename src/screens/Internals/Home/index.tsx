import React from 'react';
import {ScrollView} from 'react-native';
import {DefaultScreenTitle, styles} from '../../../commonStyles';

export function Home() {
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewBottom}
        showsVerticalScrollIndicator={false}>
        <DefaultScreenTitle> Home </DefaultScreenTitle>
      </ScrollView>
    </>
  );
}