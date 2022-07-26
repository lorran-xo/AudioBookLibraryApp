import React, {useState, useEffect} from 'react';
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
import {AudioPlayerProps} from '../../../components/AudioPlayer/types';
import {AUDIO_LIST, IMAGE_LIST} from '../../../mocks/data';

type appRoutesProps = NativeStackNavigationProp<
  AppStackParamList,
  'CommonRoutes'
>;

const OS = Platform.OS;

export function Home() {
  const {userData, audioLibraryData} = useGlobalContext();
  const appNavigation = useNavigation<appRoutesProps>();

  const [audiobookSuggestion, setAudiobookSuggestion] =
    useState<AudioPlayerProps>();
  const [currentFont, setCurrentFont] = useState<number>(Theme.fontSize.font30);
  const [imageError, setImageError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getAudiobookSuggestion() {
      const randomAudioBook: AudioPlayerProps = {
        title: audioLibraryData?.books[
          Math.floor(Math.random() * audioLibraryData?.books?.length)
        ].title,
        subtitle: audioLibraryData?.books[
          Math.floor(Math.random() * audioLibraryData?.books?.length)
        ].copyright_year,
        audioSource: AUDIO_LIST[Math.floor(Math.random() * AUDIO_LIST.length)],
        audioArtwork: IMAGE_LIST[Math.floor(Math.random() * IMAGE_LIST.length)],
        audioDuration: 999,
      };

      setAudiobookSuggestion(randomAudioBook);
      setLoading(false);
    }

    getAudiobookSuggestion();
  }, []);

  // setLoading(false);

  function adjustIosGreetingFontSize(e: any) {
    setCurrentFont(adjustIosFontSize(e, 1, currentFont));
  }

  function handleOpenAudioPlayer() {
    appNavigation.navigate(Routes.CommonRoutes, {
      screen: Routes.AudioPlayerScreen,
      params: audiobookSuggestion,
      comingFrom: Routes.HomeScreen,
    });
  }

  return (
    <>
      {loading ? (
        renderLoading()
      ) : (
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
                    <NameText fontSize={currentFont}>
                      {userData?.name}!
                    </NameText>
                  </Text>
                </GreetingView>

                <DefaultText
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  ellipsizeMode="tail">
                  Our recommendation for you now is...
                </DefaultText>
              </IntroWrapper>

              <BookCoverContainer>
                <AbsolutePositioning>
                  {!imageError ? (
                    <Image
                      style={styles.bookCover}
                      source={{
                        uri: audiobookSuggestion?.audioArtwork,
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
                      {audiobookSuggestion?.title}
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
      )}
    </>
  );
}
