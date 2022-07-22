import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';

import {HorizontalSlider} from '../../../components/HorizontalSlider';
import {Container, SliderContainer, SliderWrapper} from './styles';
import {DefaultScreenTitle, styles} from '../../../commonStyles';
import {AudioBookItem} from '../../../components/AudioBookItem';
import {mockBookList} from './mockBookList';
import {BookType} from './types';
import {renderLoading} from '../../../utils';

export function LibraryShelf() {
  const [bookList, setBookList] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [teste, setTeste] = useState([
    {
      key: '1',
      item: (
        <AudioBookItem
          coverUrl="https://ia903008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/day_great_poets_1310.jpg"
          name="A day with Great Poets"
          onPressItem={() => ({})}
        />
      ),
    },
    {
      key: '2',
      item: (
        <AudioBookItem
          coverUrl="https://ia903008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/day_great_poets_1310.jpg"
          name="A day with Great Poets"
          onPressItem={() => ({})}
        />
      ),
    },
    {
      key: '3',
      item: (
        <AudioBookItem
          coverUrl="https://ia903008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/day_great_poets_1310.jpg"
          name="A day with Great Poets"
          onPressItem={() => ({})}
        />
      ),
    },
    {
      key: '4',
      item: (
        <AudioBookItem
          coverUrl="https://ia903008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/day_great_poets_1310.jpg"
          name="A day with Great Poets"
          onPressItem={() => ({})}
        />
      ),
    },
  ]);

  // useEffect(() => {
  //   function getBookList() {
  //     const preparedResponse = mockBookList.response.map(
  //       async (item: BookType, index: number) => {
  //         const categoryDataMap = {
  //           key: String(item.id),
  //           item: (
  //             <AudioBookItem
  //               coverUrl={item.url}
  //               name={item.name}
  //               onPressItem={() => ({})}
  //             />
  //           ),
  //         };

  //         return categoryDataMap;
  //       },
  //     );

  //     console.log('preparedResponse::', preparedResponse);

  //     setBookList(preparedResponse);
  //     setLoading(false);
  //   }

  //   getBookList();
  // }, []);

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
                <HorizontalSlider>{teste}</HorizontalSlider>
              </SliderWrapper>
            </SliderContainer>

            <SliderContainer>
              <SliderWrapper>
                <HorizontalSlider>{teste}</HorizontalSlider>
              </SliderWrapper>
            </SliderContainer>

            <SliderContainer>
              <SliderWrapper>
                <HorizontalSlider>{teste}</HorizontalSlider>
              </SliderWrapper>
            </SliderContainer>
          </ScrollView>
        </Container>
      )}
    </>
  );
}

/*
// INTEGRATION

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AppStackParamList} from '../../../routes/app.routes';

type appRoutesProps = NativeStackNavigationProp<
  AppStackParamList,
  'CommonRoutes'
>;

const appNavigation = useNavigation<appRoutesProps>();

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
      comingFrom: Routes.LibraryShelfScreen,
    });
  }
*/