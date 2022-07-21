import React from 'react';
import {ScrollView, Linking} from 'react-native';

import {useGlobalContext} from '../../../hooks/context';
import {DefaultScreenTitle, DefaultText, styles} from '../../../commonStyles';
import {
  OptionArea,
  TouchableOption,
  IconWrapper,
  OptionText,
  OptionTopSpacing,
} from './styles';
import LogoutIcon from '../../../assets/icons/LogoutIcon.svg';
import GithubIcon from '../../../assets/icons/GithubIcon.svg';
import InstagramIcon from '../../../assets/icons/InstagramIcon.svg';
import {Theme} from '../../../theme';

export function About() {
  const {setUserData} = useGlobalContext();

  function handleLogout() {
    setUserData({name: '', isAuthenticated: false});
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollViewBottom}
        showsVerticalScrollIndicator={false}>
        <DefaultScreenTitle> About </DefaultScreenTitle>

        <DefaultText
          numberOfLines={2}
          adjustsFontSizeToFit
          ellipsizeMode="tail">
          The way to get started is to quit talking and begin doing.
          {/* PULL DOWN TO REFRESH */}
        </DefaultText>

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
            <TouchableOption onPress={() => handleLogout()}>
              <IconWrapper>
                <LogoutIcon width={30} height={30} fill={Theme.colors.black} />
              </IconWrapper>
              <OptionText>Logout</OptionText>
            </TouchableOption>
          </OptionTopSpacing>
        </OptionArea>
      </ScrollView>
    </>
  );
}
