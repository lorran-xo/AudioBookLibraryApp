import React, {useState} from 'react';
import {ScrollView, View, Text, Platform, Image} from 'react-native';

import {AbsolutePositioning, styles} from '../../../commonStyles';
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
  WelcomeText,
  JourneyCardBottom,
  StepDescription,
  JourneyButtonWrapper,
  StepTitle,
  JourneyCardContainer,
  styleSheet,
} from './styles';

import {adjustIosFontSize, renderLoading} from '../../../utils';
import {Button} from '../../../components/Button';

const OS = Platform.OS;

export function Home() {
  const {userData} = useGlobalContext();
  const [currentFont, setCurrentFont] = useState<number>(Theme.fontSize.font30);

  function adjustIosGreetingFontSize(e: any) {
    setCurrentFont(adjustIosFontSize(e, 1, currentFont));
  }

  return (
    <Container>
      <HeaderBackground />
      <BodyBackground />

      <ScrollView
        bounces={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewBottom}
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={isLoading}
        //     onRefresh={() => {
        //       setIsLoading(true);
        //       getNewQuote(); // TODO
        //     }}
        //   />
        // }
      >
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

            <WelcomeText
              numberOfLines={2}
              adjustsFontSizeToFit
              ellipsizeMode="tail">
              Welcome to your portable audio bookshelf.
            </WelcomeText>
          </IntroWrapper>

          <JourneyCardContainer>
            <AbsolutePositioning>
              <Image
                style={styleSheet.bookCover}
                source={{
                  uri: 'https://ia903008.us.archive.org/3/items/a_day_with_great_poets_1308_librivox/day_great_poets_1310.jpg',
                }}
              />
            </AbsolutePositioning>
            <View />

            <JourneyCardBottom>
              <StepDescription>
                <StepTitle numberOfLines={2} ellipsizeMode="tail">
                  {/* TODO: A cool quote here that updates when screen refreshes. */}
                  This is our recommendation for you today!
                </StepTitle>
              </StepDescription>

              <JourneyButtonWrapper>
                <Button title="Listen" width={263} onButtonPress={() => ({})} />
              </JourneyButtonWrapper>
            </JourneyCardBottom>
          </JourneyCardContainer>
        </ContentView>
      </ScrollView>
    </Container>
  );
}
