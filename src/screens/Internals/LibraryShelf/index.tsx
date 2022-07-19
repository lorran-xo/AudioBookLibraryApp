import React from 'react';
import {ScrollView} from 'react-native';
import {DefaultScreenTitle, styles} from '../../../commonStyles';

export function LibraryShelf() {
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewBottom}
        showsVerticalScrollIndicator={false}>
        <DefaultScreenTitle> LibraryShelf </DefaultScreenTitle>
      </ScrollView>
    </>
  );
}