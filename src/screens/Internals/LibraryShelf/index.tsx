import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AppStackParamList} from '../../../routes/app.routes';
import {HorizontalSlider} from '../../../components/HorizontalSlider';
import {Container, SliderContainer, SliderWrapper} from './styles';
import {DefaultScreenTitle, styles} from '../../../commonStyles';
import {AudioBookItem} from '../../../components/AudioBookItem';
import {renderLoading} from '../../../utils';
import {Routes} from '../../../../Constants';
import {Services} from '../../../services/services';
import {AUDIO_LIST, IMAGE_LIST} from '../../../mocks/data';
import {BookType} from './types';

type appRoutesProps = NativeStackNavigationProp<
  AppStackParamList,
  'CommonRoutes'
>;

export function LibraryShelf() {
  const appNavigation = useNavigation<appRoutesProps>();
  const [loading, setLoading] = useState<boolean>(true);
  const [slider, setSlider] = useState([]);
  const [secondSlider, setSecondSlider] = useState([]);
  const [thirdSlider, setThirdSlider] = useState([]);

  useEffect(() => {
    async function getBookList() {
      const response = Services.getRequest(
        'https://librivox.org/api/feed/audiobooks/?extended=1/?format=json',
      );

      const parsedData = await (await response).json();

      const preparedResponse = parsedData.books.map((item: BookType) => {
        return {
          key: String(item.id),
          item: (
            <AudioBookItem
              coverUrl={
                item.bookImage
                  ? item.bookImage
                  : IMAGE_LIST[Math.floor(Math.random() * IMAGE_LIST.length)]
              }
              name={item.title}
              onPressItem={() => handleOpenAudioPlayer(item.title, item.id)}
            />
          ),
        };
      });

      const slidersLength = preparedResponse.length;

      setSlider(preparedResponse.slice(0, slidersLength - 35)); // 0 to 15
      setSecondSlider(
        preparedResponse.slice(slidersLength - 34, slidersLength - 19),
      ); // 16 to  31
      setThirdSlider(preparedResponse.slice(slidersLength - 18, slidersLength)); // 32 to end

      setLoading(false);
    }

    getBookList();
  }, []);

  async function handleOpenAudioPlayer(
    selectedBookTitle: string,
    selectedBookId: number,
  ) {
    const audioTracks = Services.getRequest(
      `https://librivox.org/api/feed/audiotracks/?id=${selectedBookId}&format=json`,
    );

    const parsedData = await (await audioTracks).json();

    let audioPlayerData = {
      title: selectedBookTitle,
      subtitle: selectedBookTitle,
      audioSource: parsedData?.audio
        ? parsedData?.audio
        : AUDIO_LIST[Math.floor(Math.random() * AUDIO_LIST.length)],
      audioArtwork: slider?.bookImage
        ? slider.bookImage
        : IMAGE_LIST[Math.floor(Math.random() * IMAGE_LIST.length)],
      audioDuration: 999,
    };

    appNavigation.navigate(Routes.CommonRoutes, {
      screen: Routes.AudioPlayerScreen,
      params: audioPlayerData,
      comingFrom: Routes.LibraryShelfScreen,
    });
  }

  return (
    <>
      {loading ? (
        renderLoading()
      ) : (
        <Container>
          <ScrollView
            contentContainerStyle={styles.scrollViewBottom}
            showsVerticalScrollIndicator={false}>
            <DefaultScreenTitle>Library Shelf</DefaultScreenTitle>

            <SliderContainer>
              <SliderWrapper>
                <HorizontalSlider>{slider}</HorizontalSlider>
              </SliderWrapper>
            </SliderContainer>

            <SliderContainer>
              <SliderWrapper>
                <HorizontalSlider>{secondSlider}</HorizontalSlider>
              </SliderWrapper>
            </SliderContainer>

            <SliderContainer>
              <SliderWrapper>
                <HorizontalSlider>{thirdSlider}</HorizontalSlider>
              </SliderWrapper>
            </SliderContainer>
          </ScrollView>
        </Container>
      )}
    </>
  );
}
