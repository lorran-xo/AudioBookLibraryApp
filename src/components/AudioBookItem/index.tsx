import React from 'react';
import {Image} from 'react-native';

import {AbsolutePositioning, styles} from '../../commonStyles';
import {Container, BookCoverWrapper, BookName} from './styles';

interface Props {
  coverUrl: string;
  name: string;
  onPressItem: () => void;
}

export function AudioBookItem({coverUrl, name, onPressItem}: Props) {
  return (
    <Container activeOpacity={0.8} onPress={onPressItem}>
      <BookCoverWrapper>
        <AbsolutePositioning>
          <Image
            style={styles.bookCover}
            source={{
              uri: coverUrl,
            }}
          />
        </AbsolutePositioning>
      </BookCoverWrapper>
      <BookName numberOfLines={2}>{name}</BookName>
    </Container>
  );
}
