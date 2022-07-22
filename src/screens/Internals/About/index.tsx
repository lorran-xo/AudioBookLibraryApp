import React, {useState} from 'react';
import {ScrollView, Linking, RefreshControl, View, Text} from 'react-native';

import {useGlobalContext} from '../../../hooks/context';
import {DefaultScreenTitle, DefaultText, styles} from '../../../commonStyles';

import {
  AboutContainer,
  OptionArea,
  TouchableOption,
  IconWrapper,
  OptionText,
  OptionTopSpacing,
  NameInputContainer,
  RandomQuoteWrapper,
  InfoIconWrapper,
  AboutBottomText,
} from './styles';

import GithubIcon from '../../../assets/icons/GithubIcon.svg';
import LinkedinIcon from '../../../assets/icons/LinkedinIcon.svg';
import InstagramIcon from '../../../assets/icons/InstagramIcon.svg';
import LogoutIcon from '../../../assets/icons/LogoutIcon.svg';
import InfoIcon from '../../../assets/icons/InfoIcon.svg';

import {Theme} from '../../../theme';
import {Input} from '../../../components/Input';

const COOL_QUOTES_LIST = [
  'A phone without audiobooks is like a body without a soul.',
  'The way to get started is to quit talking and begin doing.',
  'Outside of a dog, a book is a man`s best friend.',
  'Books are a uniquely portable magic.',
  'Some of these things are lies. But they are all good stories.',
  'The best books are those that tell you what you know already.',
  'I cannot remember the books I’ve listened any more than the meals I have eaten; even so, they have made me.',
  'If there is a book that you want to listen, but it hasn’t been written yet, you must be the one to write it',
  'You know you’ve listened a good book when you finish it and feel as if you have lost a friend.',
  'Go to bed listening to an audio book can be as relaxing as a good massage.',
];

export function About() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coolQuoteIndex, setCoolQuotex] = useState<number>(
    Math.floor(Math.random() * COOL_QUOTES_LIST.length),
  );

  const {setUserData} = useGlobalContext();

  function handleLogout() {
    setUserData({name: '', isAuthenticated: false});
  }

  function getNewQuote() {
    setIsLoading(false);
    setCoolQuotex(Math.floor(Math.random() * COOL_QUOTES_LIST.length));
  }

  return (
    <AboutContainer>
      <ScrollView
        contentContainerStyle={styles.scrollViewBottom}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              setIsLoading(true);
              getNewQuote();
            }}
          />
        }>
        <DefaultScreenTitle> About </DefaultScreenTitle>

        <RandomQuoteWrapper>
          <DefaultText
            numberOfLines={2}
            adjustsFontSizeToFit
            ellipsizeMode="tail">
            {COOL_QUOTES_LIST[coolQuoteIndex]}
          </DefaultText>

          <InfoIconWrapper onPress={() => ({})}> 
          {/* TODO */}
            <InfoIcon width={20} height={20} fill={Theme.colors.black} />
          </InfoIconWrapper>
        </RandomQuoteWrapper>

        <NameInputContainer>
          <Input
            inputValue="Lorran"
            placeholder="Edit Name"
            onBlur={() => console.log('edit now')}
            // TODO
            handleTextChange={() => ({})}
          />
        </NameInputContainer>

        <OptionArea>
          <TouchableOption
            onPress={() => Linking.openURL('https://github.com/lorran-xo')}>
            <IconWrapper>
              <GithubIcon width={30} height={30} fill={Theme.colors.black} />
            </IconWrapper>
            <OptionText>Github</OptionText>
          </TouchableOption>

          <OptionTopSpacing>
            <TouchableOption
              onPress={() =>
                Linking.openURL('https://www.instagram.com/lorran_xo/')
              }>
              <IconWrapper>
                <InstagramIcon
                  width={30}
                  height={30}
                  fill={Theme.colors.black}
                />
              </IconWrapper>
              <OptionText>Instagram</OptionText>
            </TouchableOption>
          </OptionTopSpacing>

          <OptionTopSpacing>
            <TouchableOption
              onPress={() =>
                Linking.openURL('https://www.linkedin.com/in/lorran-x-oliv/')
              }>
              <IconWrapper>
                <LinkedinIcon
                  width={30}
                  height={30}
                  fill={Theme.colors.black}
                />
              </IconWrapper>
              <OptionText>LinkedIn</OptionText>
            </TouchableOption>
          </OptionTopSpacing>

          <OptionTopSpacing>
            <TouchableOption onPress={() => handleLogout()}>
              <IconWrapper>
                <LogoutIcon width={30} height={30} fill={Theme.colors.black} />
              </IconWrapper>
              <OptionText>Logout</OptionText>
            </TouchableOption>
          </OptionTopSpacing>
        </OptionArea>
      </ScrollView>
      <AboutBottomText>
        <Text> Developed by Lorran Oliveira</Text>
      </AboutBottomText>
    </AboutContainer>
  );
}
