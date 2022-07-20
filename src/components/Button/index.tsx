import React from 'react';

import {Container, Title} from './styles';

interface Props {
  title: string;
  disabled?: boolean;
  width?: number;
  onButtonPress: () => void;
}

export function Button({
  title,
  disabled = false,
  width,
  onButtonPress,
}: Props) {

  return (
    <Container
      testID="button-component"
      disabled={disabled}
      onPress={onButtonPress}
      activeOpacity={0.7}
      underlayColor="#234d76"
      width={width}>
      <Title disabled={disabled}>
        {title}
      </Title>
    </Container>
  );
}
