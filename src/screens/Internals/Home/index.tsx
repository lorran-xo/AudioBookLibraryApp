import React, {useState} from 'react';
import {ScrollView, View, Text, Platform, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AppStackParamList} from '../../../routes/app.routes';
import {useGlobalContext} from '../../../hooks/context';
import {Theme} from '../../../theme';

import {
  DefaultContainer,
  AbsolutePositioning,
  DefaultText,
  TopBackground,
  BottomBackground,
  styles,
} from '../../../commonStyles';

import {
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
import {Routes} from '../../../../Constants';

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
    // TO INTEGRATE
    let audioPlayerData = {
      title: 'The War of the Worlds',
      subtitle: 'H. G. Wells',
      audioSource:
        'https://ia601809.us.archive.org/9/items/ghohor047_2012_librivox/ghohor047_valleywheredeadmenlive_ward_dg_128kb.mp3',
      audioArtwork:
        'https://cv2.litres.ru/pub/c/elektronnaya-kniga/cover_200/66438829-h-g-wells-the-war-of-the-worlds-active-toc-free-audiobook.jpg',
      audioDuration: 300,
    };

    appNavigation.navigate(Routes.CommonRoutes, {
      screen: Routes.AudioPlayerScreen,
      params: audioPlayerData,
      comingFrom: Routes.HomeScreen,
    });
  }

  return (
    <DefaultContainer>
      <TopBackground />
      <BottomBackground />

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
                    uri: 'https://cv2.litres.ru/pub/c/elektronnaya-kniga/cover_200/66438829-h-g-wells-the-war-of-the-worlds-active-toc-free-audiobook.jpg',
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
                  The War of the Worlds
                </RecText>
              </RecWrapper>

              <ListenButtonWrapper>
                <Button
                  title="Listen now"
                  width={265}
                  onButtonPress={() => handleOpenAudioPlayer()}
                />
              </ListenButtonWrapper>
            </BookCoverBottom>
          </BookCoverContainer>
        </ContentView>
      </ScrollView>
    </DefaultContainer>
  );
}
