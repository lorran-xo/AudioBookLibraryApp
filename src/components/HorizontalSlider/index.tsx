import React from 'react';
import {FlatList} from 'react-native';
import {Container, SliderContainer, ItemContainer, styleSheet} from './styles';

interface childrenItem {
  key: string;
  item: JSX.Element;
}

interface Props {
  children?: childrenItem[];
}

export function HorizontalSlider({children}: Props) {
  return (
    <Container>
      <SliderContainer>
        <FlatList
          data={children}
          renderItem={({item}) => <ItemContainer>{item.item}</ItemContainer>}
          keyExtractor={item => item.key}
          showsHorizontalScrollIndicator={false}
          bounces={false}
          alwaysBounceHorizontal={false}
          contentContainerStyle={styleSheet.lastItemPadding}
          horizontal
        />
      </SliderContainer>
    </Container>
  );
}
