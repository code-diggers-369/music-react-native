import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import screens
import SplashScreen from '../views/SplashScreen/SplashScreen';
import BottomMusicWidget from '../views/BottomMusicWidget/BottomMusicWidget';

// import Login from '../views/Login';
import EntryScreen from '../views/EntryScreen/EntryScreen';
import AlbumScreen from '../views/AlbumPage/AlbumPage';
import PlayerScreen from '../views/Player/Player';

// import bottom navigation
// import BottomNavigation from './bottomNavigation';

//

const MainNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {viewSplashScreen ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : null} */}

        <Stack.Screen
          name="Entry"
          component={EntryScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AlbumPage"
          component={AlbumScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="PlayerPage"
          component={PlayerScreen}
          options={{headerShown: false}}
        />
        {/* 
        <Stack.Screen
          name="Main"
          component={BottomNavigation}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
      {/* <StatusBar backgroundColor={'transparent'} translucent={true} /> */}
      <StatusBar backgroundColor={'transparent'} />
      {/* {!viewSplashScreen ? <BottomMusicWidget /> : null} */}
    </NavigationContainer>
  );
};

export default MainNavigation;
