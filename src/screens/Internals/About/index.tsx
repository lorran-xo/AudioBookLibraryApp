import React, {useState} from 'react';
import {ScrollView, Linking, RefreshControl, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useGlobalContext} from '../../../hooks/context';
import {DefaultScreenTitle, DefaultText, styles} from '../../../commonStyles';

import {
  AboutContainer,
  OptionArea,
  TouchableOption,
  IconWrapper,
  OptionText,
  OptionTopSpacing,
  InfoText,
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
import {BottomModal} from '../../../components/BottomModal';
import {COOL_QUOTES_LIST} from './quoteList';
import {matchNumberInString} from '../../../utils';
import {Routes} from '../../../../Constants';
import {AppStackParamList} from '../../../routes/app.routes';

type appRoutesProps = NativeStackNavigationProp<
  AppStackParamList,
  'CommonRoutes'
>;

export function About() {
  const appNavigation = useNavigation<appRoutesProps>();

  const {userData, setUserData, setToastData} = useGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(userData.name);
  const [showInfoBottomModal, setShowInfoBottomModal] =
    useState<boolean>(false);
  const [coolQuoteIndex, setCoolQuotex] = useState<number>(
    Math.floor(Math.random() * COOL_QUOTES_LIST.length),
  );

  function handleLogout() {
    setUserData({name: '', isAuthenticated: false});
  }

  function getNewQuote() {
    setIsLoading(false);
    setCoolQuotex(Math.floor(Math.random() * COOL_QUOTES_LIST.length));
  }

  function renderBottomModal(): JSX.Element {
    return (
      <BottomModal
        height={273}
        showModal={showInfoBottomModal}
        closeModal={() => setShowInfoBottomModal(false)}>
        <InfoText>
          Pull the screen down to refresh and get a new quote!
        </InfoText>
      </BottomModal>
    );
  }

  function handleEditName() {
    if (newName && !matchNumberInString(newName)) {
      setUserData({...userData, name: newName});
      setToastData({
        title: 'Success',
        label: `You've updated your name`,
        type: 'warning',
      });
    } else {
      setNewName(userData.name);
      setToastData({
        title: 'Failed',
        label: `Please, insert a valid name`,
        type: 'error',
      });
    }
  }

  function handleOpenAudioPlayer() {
    // TODO
    let audioPlayerData = {
      index: 123,
      title: 'A Day With Great Poets',
      subtitle: 'Gillington Byron',
      audioSource:
        'http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
      audioArtwork:
        'https://ia903008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/day_great_poets_1310.jpg',
      audioDuration: 300,
    };

    appNavigation.navigate(Routes.CommonRoutes, {
      screen: Routes.AudioPlayerScreen,
      params: audioPlayerData,
      comingFrom: Routes.LibraryShelfScreen,
    });
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

          <InfoIconWrapper onPress={() => setShowInfoBottomModal(true)}>
            <InfoIcon width={20} height={20} fill={Theme.colors.black} />
          </InfoIconWrapper>
        </RandomQuoteWrapper>

        <NameInputContainer>
          <Input
            inputValue={newName}
            placeholder="Edit Name"
            onBlur={() => handleEditName()}
            handleTextChange={newTypedName => setNewName(newTypedName)}
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
              }
              // onPress={() => handleOpenAudioPlayer()} // TODO
            >
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

      {showInfoBottomModal && renderBottomModal()}
    </AboutContainer>
  );
}
