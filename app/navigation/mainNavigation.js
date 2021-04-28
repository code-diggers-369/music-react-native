import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import screens
import SplashScreen from '../views/SplashScreen';
import BottomMusicWidget from '../views/BottomMusicWidget';
// import Login from '../views/Login';
import EntryScreen from '../views/EntryScreen';

// import bottom navigation
// import BottomNavigation from './bottomNavigation';

//

const MainNavigation = () => {
  const [viewSplashScreen, setViewSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setViewSplashScreen(false);
    }, 3000);
  }, []);

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {viewSplashScreen ? (
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : null}

        <Stack.Screen
          name="Entry"
          component={EntryScreen}
          options={{headerShown: false}}
        />
        {/* 
        <Stack.Screen
          name="Main"
          component={BottomNavigation}
          options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      {/* {!viewSplashScreen ? <BottomMusicWidget /> : null} */}
    </NavigationContainer>
  );
};

export default MainNavigation;
