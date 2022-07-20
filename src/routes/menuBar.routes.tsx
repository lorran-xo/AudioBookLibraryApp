import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';

import {Home} from '../screens/Internals/Home';
import {LibraryShelf} from '../screens/Internals/LibraryShelf';
import {About} from '../screens/Internals/About';

import ExploreIcon from '../assets/icons/Explore.svg';
import HomeIcon from '../assets/icons/Home.svg';
import ProfileIcon from '../assets/icons/Profile.svg';

import {Theme} from '../theme';

export type menuBarStackParamList = {
  Today: undefined;
  Explore: undefined;
  Profile: undefined;
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
        // TODO - styles
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: Theme.colors.background,
        tabBarInactiveTintColor: '#E5E5E501',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: 'rgba(241, 241, 241, 0.8)',
          position: 'absolute',
          elevation: 0,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          height: 90,
        },
      }}>
      <Tab.Screen
        name="Today"
        component={Home}
        options={{
          tabBarIcon: ({size, color}: TabBarIconProps) =>
            containerTabBar({
              icon: <HomeIcon fill={color} height={size} />,
            }),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={LibraryShelf}
        options={{
          tabBarIcon: ({size, color}: TabBarIconProps) =>
            containerTabBar({
              icon: <ExploreIcon fill={color} height={size} />,
            }),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={About}
        options={{
          tabBarIcon: ({size, color}: TabBarIconProps) =>
            containerTabBar({
              icon: <ProfileIcon fill={color} height={size} />,
            }),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  containerTabBar: {
    alignItems: 'center',
  },

  tabBar: {
    position: 'absolute',
    height: 90,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.7,
  },

  containerTabBarIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
