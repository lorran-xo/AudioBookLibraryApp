import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {AudioPlayer} from '../../../../components/AudioPlayer';
import {Routes} from '../../../../../Constants';
import {menuBarStackParamList} from '../../../../routes/menuBar.routes';

type appRoutesProps = NativeStackNavigationProp<
  menuBarStackParamList,
  'LibraryShelf'
>;

export function AudioPlayerScreen() {
  const appBarNavigation = useNavigation<appRoutesProps>();

  const route: any = useRoute();
  const params = route.params;

  async function handleCloseAudioPlayer() {
    if (params?.comingFrom === Routes.HomeScreen) {
      appBarNavigation.navigate(Routes.HomeScreen);
    } else if (params?.comingFrom === Routes.LibraryShelfScreen) {
      appBarNavigation.navigate(Routes.LibraryShelfScreen);
    } else {
      appBarNavigation.goBack();
    }
  }

  return (
    <>
      <AudioPlayer
        title={params.title}
        subtitle={params.subtitle}
        audioSource={params.audioSource}
        audioArtwork={params.audioArtwork}
        audioDuration={params.audioDuration}
        onAudioFinished={() => ({})} // show success toast
        onPressClose={() => handleCloseAudioPlayer()}
      />
    </>
  );
}
