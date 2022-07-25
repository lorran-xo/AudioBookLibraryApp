import React, {useState} from 'react';
import {ScrollView, View, Text, Platform, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AbsolutePositioning, DefaultText, styles} from '../../../commonStyles';
import {AppStackParamList} from '../../../routes/app.routes';
import {useGlobalContext} from '../../../hooks/context';
import {Theme} from '../../../theme';
import {
  Container,
  HeaderBackground,
  BodyBackground,
  ContentView,
  IntroWrapper,
  GreetingView,
  GreetingText,
  NameText,
  BookCoverBottom,
  RecWrapper,
  RecText,
  ListenButtonWrapper,
  BookCoverContainer,
} from './styles';

import {adjustIosFontSize, renderLoading} from '../../../utils';
import {Button} from '../../../components/Button';
import { Routes } from '../../../../Constants';

type appRoutesProps = NativeStackNavigationProp<
  AppStackParamList,
  'CommonRoutes'
>;

const OS = Platform.OS;

export function Home() {
  const {userData} = useGlobalContext();
  const appNavigation = useNavigation<appRoutesProps>();

  const [currentFont, setCurrentFont] = useState<number>(Theme.fontSize.font30);
  const [imageError, setImageError] = useState<boolean>(false);

  function adjustIosGreetingFontSize(e: any) {
    setCurrentFont(adjustIosFontSize(e, 1, currentFont));
  }

  function handleOpenAudioPlayer() {
    // INTEGRATION
    let audioPlayerData = {
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
      comingFrom: Routes.HomeScreen,
    });
  }

  return (
    <Container>
      <HeaderBackground />
      <BodyBackground />

      <ScrollView
        bounces={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewBottom}
        showsVerticalScrollIndicator={false}>
        <ContentView>
          <IntroWrapper>
            <GreetingView>
              <Text
                numberOfLines={OS === 'android' ? 1 : undefined}
                adjustsFontSizeToFit={OS === 'android'}
                onTextLayout={(e: any) =>
                  OS === 'ios' && adjustIosGreetingFontSize(e)
                }>
                <GreetingText fontSize={currentFont}>Hello, </GreetingText>
                <NameText fontSize={currentFont}>{userData?.name}!</NameText>
              </Text>
            </GreetingView>

            <DefaultText
              numberOfLines={2}
              adjustsFontSizeToFit
              ellipsizeMode="tail">
              Our recommendation for you today is...
            </DefaultText>
          </IntroWrapper>

          <BookCoverContainer>
            <AbsolutePositioning>
              {!imageError ? (
                <Image
                  style={styles.bookCover}
                  source={{
                    uri: 'https://ia903008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/day_great_poets_1310.jpg',
                  }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <Image
                  style={styles.bookCoverError}
                  source={require('../../../assets/images/AudioBookImageError.jpg')}
                />
              )}
            </AbsolutePositioning>
            <View />

            <BookCoverBottom>
              <RecWrapper>
                <RecText numberOfLines={2} ellipsizeMode="tail">
                  A Day With Great Poets
                </RecText>
              </RecWrapper>

              <ListenButtonWrapper>
                <Button title="Listen now" width={265} onButtonPress={() => handleOpenAudioPlayer()} />
              </ListenButtonWrapper>
            </BookCoverBottom>
          </BookCoverContainer>
        </ContentView>
      </ScrollView>
    </Container>
  );
}
