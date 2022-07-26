import React, {useState} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import MMKVStorage from 'react-native-mmkv-storage';

import {
  Container,
  AppLogo,
  LoginText,
  LoginTextWrapper,
  LoginWelcomeText,
  LoginTextDescription,
  InputContainer,
  ButtonContainer,
} from './styles';

import Logo from '../../../assets/logos/app-logo.svg';
import {styles} from '../../../commonStyles';
import {useGlobalContext} from '../../../hooks/context';
import {Input} from '../../../components/Input';
import {Button} from '../../../components/Button';
import {Theme} from '../../../theme';
import {matchNumberInString} from '../../../utils';

const localStorage = new MMKVStorage.Loader().initialize();

export function Login() {
  const {login} = useGlobalContext();
  const [typedUserName, setTypedUserName] = useState<string>('');
  const [inputError, setInputError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  function handleLogin() {
    setLoading(true);
    if (typedUserName && !matchNumberInString(typedUserName)) {
      login(typedUserName).then(() => {
        setLoading(false);
      });

      return;
    }

    setInputError('Please, fill in with a valid name ');
    setLoading(false);
  }

  function handleGetTypedInput(value: string) {
    setTypedUserName(value);

    if (inputError) {
      setInputError('');
    }
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
              handleTextChange={value => handleGetTypedInput(value)}
            />
          </InputContainer>

          <ButtonContainer>
            <Button
              disabled={loading}
              title={!loading ? 'Start' : ''}
              onButtonPress={() => handleLogin()}
            />
            {loading && (
              <ActivityIndicator
                style={styles.styleSheetAbsolutePositioniing}
                size="small"
                color={Theme.colors.logo}
              />
            )}
          </ButtonContainer>
        </LoginTextWrapper>
      </ScrollView>
    </Container>
  );
}
