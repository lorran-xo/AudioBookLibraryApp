import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';

import {Home} from '../screens/Internals/Home';
import {LibraryShelf} from '../screens/Internals/LibraryShelf';
import {About} from '../screens/Internals/About';


import HomeIcon from '../assets/icons/Home.svg';
import LibraryIcon from '../assets/icons/Library.svg';
import AboutIcon from '../assets/icons/About.svg';

import {Theme} from '../theme';
import {styles} from './styles';

export type menuBarStackParamList = {
  Home: undefined;
  LibraryShelf: undefined;
  About: undefined;
};

const Tab = createBottomTabNavigator<menuBarStackParamList>();

export function MenuBar() {
  type ContainerTabBarProps = {
    icon: JSX.Element;
  };

  type TabBarIconProps = {
    size: number;
    color: string;
  };

  function containerTabBar({icon}: ContainerTabBarProps) {
    return (
      <View style={styles.containerTabBar}>
        <View style={styles.containerTabBarIcon}>{icon}</View>
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: Theme.colors.filled,
        tabBarInactiveTintColor: Theme.colors.lightGray,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarInline,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({size, color}: TabBarIconProps) =>
            containerTabBar({
              icon: <HomeIcon fill={color} height={size} />,
            }),
        }}
      />
      <Tab.Screen
        name="LibraryShelf"
        component={LibraryShelf}
        options={{
          tabBarIcon: ({size, color}: TabBarIconProps) =>
            containerTabBar({
              icon: <LibraryIcon fill={color} height={size} />,
            }),
        }}
      />

      <Tab.Screen
        name="About"
        component={About}
        options={{
          tabBarIcon: ({size, color}: TabBarIconProps) =>
            containerTabBar({
              icon: <AboutIcon fill={color} height={size} />,
            }),
        }}
      />
    </Tab.Navigator>
  );
}
