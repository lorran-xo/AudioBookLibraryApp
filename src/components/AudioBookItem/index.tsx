import React, {useState} from 'react';
import {Image} from 'react-native';

import {AbsolutePositioning, styles} from '../../commonStyles';
import {Container, BookCoverWrapper, BookName} from './styles';

interface Props {
  coverUrl: string;
  name: string;
  onPressItem: () => void;
}

export function AudioBookItem({coverUrl, name, onPressItem}: Props) {
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <Container activeOpacity={0.8} onPress={onPressItem}>
      <BookCoverWrapper>
        <AbsolutePositioning>
          {!imageError ? (
            <Image
              style={styles.bookCover}
              source={{
                uri: coverUrl,
              }}
              // onLoad={() => ({})} // check
              onError={() => setImageError(true)}
            />
          ) : (
            <Image
              style={styles.bookCoverError}
              source={require('../../assets/images/AudioBookImageError.jpg')}
            />
          )}
        </AbsolutePositioning>
      </BookCoverWrapper>
      <BookName numberOfLines={2}>{name}</BookName>
    </Container>
  );
}
