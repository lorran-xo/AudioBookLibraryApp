import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import {
  AppLogo,
  LoginText,
  LoginTextWrapper,
  LoginWelcomeText,
  LoginTextDescription,
  InputContainer,
  ButtonContainer,
} from './styles';

import Logo from '../../../assets/logos/app-logo.svg';
import {Container, styles} from '../../../commonStyles';
import {useGlobalContext} from '../../../hooks/context';
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import { Theme } from '../../../theme';

export function Login() {
  const {setUserData} = useGlobalContext();
  const [typedUserName, setTypedUserName] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');

  function handleLogin() {
    if (typedUserName) {
      setInputError('');
      setUserData({name: typedUserName, isAuthenticated: true});
      // INTEGRATION: Here we will set a random book recommendation for Home screen.

      return;
    }

    setInputError('Please, fill in with your name!');
  }

  return (
    <Container>
      <ScrollView
        contentContainerStyle={styles.scrollViewBottom}
        showsVerticalScrollIndicator={false}>
        <AppLogo>
          <Logo width={100} height={100} fill={Theme.colors.secondary} />
        </AppLogo>

        <LoginTextWrapper>
          <LoginText>Login</LoginText>
          <LoginWelcomeText onPress={() => handleLogin()}>
            Welcome to your audiobook library!
          </LoginWelcomeText>

          <LoginTextDescription>
            Fill in with your name to log in
          </LoginTextDescription>

          <InputContainer>
            <Input
              autoComplete="name"
              autoCapitalize="words"
              placeholder="Name"
              errorText={inputError}
              inputValue={typedUserName}
              handleTextChange={value => setTypedUserName(value)}
            />
          </InputContainer>

          <ButtonContainer>
            <Button title="Start" onButtonPress={() => handleLogin()} />
          </ButtonContainer>
        </LoginTextWrapper>
      </ScrollView>
    </Container>
  );
}
