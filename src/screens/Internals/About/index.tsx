import React from 'react';
import {ScrollView, Text} from 'react-native';
import {DefaultScreenTitle, styles} from '../../../commonStyles';

export function About() {
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewBottom}
        showsVerticalScrollIndicator={false}>
        <DefaultScreenTitle> About </DefaultScreenTitle>
        <Text>Logout</Text>
      </ScrollView>
    </>
  );
}
