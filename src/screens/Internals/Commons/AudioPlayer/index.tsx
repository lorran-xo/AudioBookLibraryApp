import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AudioPlayer} from '../../../../components/AudioPlayer';
import {menuBarStackParamList} from '../../../../routes/menuBar.routes';
import {useGlobalContext} from '../../../../hooks/context';
import TrackPlayer from 'react-native-track-player';

type appRoutesProps = NativeStackNavigationProp<
  menuBarStackParamList,
  'LibraryShelf'
>;

export function AudioPlayerScreen() {
  const appBarNavigation = useNavigation<appRoutesProps>();

  const route: any = useRoute();
  const params = route.params;

  const {setToastData} = useGlobalContext();

  async function handleCloseAudioPlayer() {
    if (params?.comingFrom) {
      appBarNavigation.navigate(params?.comingFrom);
    } else {
      appBarNavigation.goBack();
    }

    await TrackPlayer.destroy();
  }

  return (
    <>
      <AudioPlayer
        title={params.title}
        subtitle={params.subtitle}
        audioSource={params.audioSource}
        audioArtwork={params.audioArtwork}
        audioDuration={params.audioDuration}
        onAudioFinished={() =>
          setToastData({
            title: 'Congratulations!',
            label: `You've just finished an audiobook`,
            type: 'success',
          })
        }
        onPressClose={() => handleCloseAudioPlayer()}
      />
    </>
  );
}
