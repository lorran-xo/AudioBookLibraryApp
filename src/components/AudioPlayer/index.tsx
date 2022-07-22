import React, {useEffect, useState} from 'react';
import Slider from '@react-native-community/slider';
import uuid from 'react-native-uuid';
import moment from 'moment';

import {TouchableOpacity, StyleSheet, View, Platform} from 'react-native';

import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

import {
  Container,
  PlayerHeader,
  AudioTexts,
  TitleText,
  SubtitleText,
  TimerText,
  PlayerBottom,
  PlayerButtons,
  PlayIconWrapper,
  ActionsWrapper,
} from './styles';

import CloseIcon from './../../assets/icons/CloseIcon.svg';
import FastRewindIcon from './../../assets/icons/FastRewindIcon.svg';
import PlayIcon from './../../assets/icons/PlayIcon.svg';
import PauseIcon from './../../assets/icons/PauseIcon.svg';
import FastForwardIcon from './../../assets/icons/FastForwardIcon.svg';
import {Theme} from '../../theme';
import {
  OnSwipingOrPressingBack,
  CloseButtonTouchableArea,
  getMinimalTouchableArea,
} from '../../utils';

interface Props {
  title: string;
  subtitle: string;
  audioSource: string;
  audioArtwork: string;
  audioDuration: number; // seconds
  onAudioFinished: () => void;
  onPressClose: () => void;
}

const ACTION_BUTTON_TOUCHABLE_AREA = getMinimalTouchableArea(21, 25);
const JUMP_OFFSET = 15;
const PROGRESS_UPDATE_INTERVAL = 500;

export function AudioPlayer({
  title,
  subtitle,
  audioSource,
  audioArtwork,
  audioDuration,
  onAudioFinished = () => ({}),
  onPressClose = () => ({}),
}: Props) {
  const playbackState = usePlaybackState();
  const progress = useProgress(PROGRESS_UPDATE_INTERVAL);

  // These are recommended minimal dimensions for touchable icons
  const smallIconsWidth = Theme.metrics.screenWidth * 0.056;
  const smallIconsHeight = Theme.metrics.screenHeight * 0.0288;
  const playPauseWidth = Theme.metrics.screenWidth * 0.1707;
  const playPauseHeight = Theme.metrics.screenHeight * 0.0877;

  const [trackPlayerPlaybackTime, setTrackPlayerPlaybackTime] =
    useState<string>('');
  const [trackPlayerPlaybackCompleted, setTrackPlayerPlaybackCompleted] =
    useState<boolean>(false);

  const [actualTimeListened, setActualTimeListened] = useState<number>(0);
  const [jumpedForwardTime, setJumpedForwardTime] = useState<number>(0);

  const styles = StyleSheet.create({
    progressBarPosition: {
      bottom: 7,
    },
    timingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  useTrackPlayerEvents(
    [
      Event.PlaybackState,
      Event.PlaybackQueueEnded,
      Event.RemoteJumpBackward,
      Event.RemoteJumpForward,
    ],
    async event => {
      console.debug('event.type: ' + event.type);

      switch (event.type) {
        case Event.PlaybackQueueEnded:
          if (!trackPlayerPlaybackCompleted) {
            setTrackPlayerPlaybackCompleted(true);
            onAudioFinished();
            seekTo(progress.duration);
          }
          break;

        case Event.RemoteJumpBackward:
          jumpBackward();
          break;

        case Event.RemoteJumpForward:
          jumpForward();
          break;

        case Event.RemotePause:
        case Event.RemoteStop:
          togglePlayPause();
          break;

        default:
          break;
      }

      updateTrackPlayerPlaybackTime();
    },
  );

  useEffect(() => {
    async function initializePlayer() {
      console.debug('initializePlayer()');

      setTrackPlayerPlaybackCompleted(false);

      await TrackPlayer.setupPlayer();
      await TrackPlayer.setRepeatMode(RepeatMode.Off);
      await TrackPlayer.updateOptions({
        backwardJumpInterval: JUMP_OFFSET,
        forwardJumpInterval: JUMP_OFFSET,
        stopWithApp: true,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.Stop,
          Capability.JumpBackward,
          Capability.JumpForward,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      await TrackPlayer.add({
        id: String(uuid.v4()),
        title: title,
        artist: subtitle,
        url: audioSource,
        artwork: audioArtwork,
        duration: audioDuration,
      });

      await TrackPlayer.play();
    }

    initializePlayer();
  }, []);

  useEffect(() => {
    updateTrackPlayerPlaybackTime();
  }, [playbackState, progress]);

  async function updateTrackPlayerPlaybackTime() {
    const duration: number = Math.round(progress.duration);

    let position: number = Math.round(progress.position);
    position = position < 0 ? 0 : position;
    position = position > duration ? duration : position;

    let playbackTime: string = '';
    let countdown: number = (duration - position) * 1000;

    if (countdown > 0) {
      const date = new Date(countdown);
      playbackTime = moment(date).format('mm:ss');
    }
    // Show 00:00 only at the end of playback.
    else if (duration > 0) {
      playbackTime = '00:00';
    }

    setTrackPlayerPlaybackTime(playbackTime);
  }

  async function togglePlayPause() {
    if (playbackState === State.Playing) {
      console.debug('togglePlayPause(): ' + playbackState + ', pausing');

      await TrackPlayer.pause();
    } else if (
      playbackState === State.Paused ||
      playbackState === State.Stopped
    ) {
      console.debug('togglePlayPause(): ' + playbackState + ', playing');

      // If end is reached, seek to start.
      if (trackPlayerPlaybackCompleted) {
        setTrackPlayerPlaybackCompleted(false);
        await TrackPlayer.seekTo(0);
      }

      await TrackPlayer.play();
    }
  }

  async function jumpBackward() {
    console.debug('jumpBackward()');

    try {
      setTrackPlayerPlaybackCompleted(false);

      const position = await TrackPlayer.getPosition();
      seekTo(position - JUMP_OFFSET);
    } catch (err) {
      console.error(err);
    }
  }

  async function jumpForward() {
    console.debug('jumpForward()');

    try {
      const position: number = await TrackPlayer.getPosition();
      setJumpedForwardTime(jumpedForwardTime + JUMP_OFFSET);
      seekTo(position + JUMP_OFFSET);
    } catch (err) {
      console.error(err);
    }
  }

  async function seekTo(value: number) {
    let target: number = Math.round(value);
    target = target < 0 ? 0 : target;
    target = target > progress.duration ? progress.duration : target;

    await TrackPlayer.seekTo(target);
    updateTrackPlayerPlaybackTime();
  }

  async function handleCloseAudioPlayer() {
    console.debug('handleCloseAudioPlayer()');

    await TrackPlayer.stop();
    await TrackPlayer.destroy();

    onPressClose();
  }

  OnSwipingOrPressingBack(() => {
    handleCloseAudioPlayer();
    return true;
  }, []);

  return (
    <Container>
      <PlayerHeader>
        <TouchableOpacity
          hitSlop={CloseButtonTouchableArea}
          onPress={() => handleCloseAudioPlayer()}>
          <CloseIcon width={20} height={20} fill={Theme.colors.white} />
        </TouchableOpacity>

        <AudioTexts>
          <TitleText>{title}</TitleText>

          <SubtitleText>{subtitle}</SubtitleText>
        </AudioTexts>
      </PlayerHeader>

      <View style={styles.timingContainer}>
        <TimerText>{trackPlayerPlaybackTime}</TimerText>
      </View>

      <PlayerBottom>
        <Slider
          style={styles.progressBarPosition}
          value={progress.position}
          minimumValue={0}
          maximumValue={progress.duration}
          thumbTintColor={Theme.colors.white}
          minimumTrackTintColor={Theme.colors.white}
          maximumTrackTintColor={Theme.colors.gray}
          onSlidingComplete={async value => {
            setJumpedForwardTime(
              jumpedForwardTime + (value - actualTimeListened),
            );
            seekTo(value);
          }}
        />

        <ActionsWrapper>
          <PlayerButtons>
            <TouchableOpacity
              hitSlop={ACTION_BUTTON_TOUCHABLE_AREA}
              onPress={() => jumpBackward()}>
              <FastRewindIcon
                width={smallIconsWidth}
                height={smallIconsHeight}
              />
            </TouchableOpacity>

            <PlayIconWrapper onPress={() => togglePlayPause()}>
              {playbackState === State.Playing ? (
                <PauseIcon width={playPauseWidth} height={playPauseHeight} />
              ) : (
                <PlayIcon width={playPauseWidth} height={playPauseHeight} />
              )}
            </PlayIconWrapper>

            <TouchableOpacity
              hitSlop={ACTION_BUTTON_TOUCHABLE_AREA}
              onPress={() => jumpForward()}>
              <FastForwardIcon
                width={smallIconsWidth}
                height={smallIconsHeight}
              />
            </TouchableOpacity>
          </PlayerButtons>
        </ActionsWrapper>
      </PlayerBottom>
    </Container>
  );
}
