import React, {useEffect, useState, useRef} from 'react';
import {
  TextInputProps,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';

import {
  Container,
  StyledInput,
  InputWrapper,
  InputAlertText,
} from './styles';

import {
  AutoCapitalizeType,
  AutoCompleteType,
  InputType,
} from './types';

import {Theme} from '../../theme';

interface Props extends TextInputProps {
  inputValue: string;
  placeholder: string;
  autoCapitalize?: AutoCapitalizeType;
  autoComplete?: AutoCompleteType;
  autoCorrect?: boolean;
  inputType?: InputType;
  editable?: boolean;
  errorText?: string;
  isActive?: (state: boolean) => void;
  onPressIcon?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  handleTextChange: (value: string) => void;
}

export function Input({
  inputValue = '',
  inputType = 'default',
  autoCapitalize = 'none',
  autoComplete = 'off',
  autoCorrect = false,
  editable = true,
  placeholder = '',
  errorText = '',
  isActive = () => false,
  onFocus = () => ({}),
  onBlur = () => ({}),
  handleTextChange,
}: Props) {
  const [inputText, setInputText] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);

  const inputRef = useRef(null);

  const animatedInputPlaceholder = new Animated.Value(inputText === '' ? 0 : 1);

  const styles = StyleSheet.create({
    animatedPlaceholder: {
      position: 'absolute',
      marginLeft: Theme.metrics.screenWidth * 0.043,
      color: Theme.colors.textPrimary,
      opacity: 1,
      fontWeight: '200',
      zIndex: 2,
    },
  });

  useEffect(() => {
    setInputText(inputValue);
  }, [inputValue]);

  useEffect(() => {
    Animated.timing(animatedInputPlaceholder, {
      toValue: active || inputText ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    // Should only execute this useEffect on input focus change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  function handleText(value: string) {
    setInputText(value);
    handleTextChange(value);
  }

  function handleInputOnFocus() {
    setActive(true);
    isActive(true);
    onFocus();
  }

  function handleInputOnBlur() {
    setActive(false);
    isActive(false);
    onBlur();
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={() => inputRef?.current?.focus()}>
        <Animated.Text
          style={[
            styles.animatedPlaceholder,
            {
              top: animatedInputPlaceholder.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  Platform.OS === 'ios' ? 18 : 13,
                  Platform.OS === 'ios' ? 8 : 5,
                ],
              }),

              fontSize: animatedInputPlaceholder.interpolate({
                inputRange: [0, 1],
                outputRange: [Theme.fontSize.font16, Theme.fontSize.font12],
              }),
            },
          ]}>
          {placeholder}
        </Animated.Text>
      </TouchableWithoutFeedback>

      <InputWrapper active={active}>
        <StyledInput
          ref={inputRef}
          testID="input_component"
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          value={String(inputText)}
          onChangeText={handleText}
          onFocus={() => handleInputOnFocus()}
          onBlur={() => handleInputOnBlur()}
          active={active}
          editable={editable}
          keyboardType={inputType}
          selectionColor="#9db4cb"
        />
      </InputWrapper>
      <View>
        <InputAlertText>{errorText}</InputAlertText>
      </View>
    </Container>
  );
}
