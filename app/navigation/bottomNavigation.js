import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

// import colors
import Colors from '../utils/colors';

// import screen
import Home from '../views/Home/Home';
import Search from '../views/Search/Search';
import Library from '../views/Library/Library';
import Profile from '../views/Profile/Profile';

export default function bottomNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        style: {backgroundColor: Colors.Color0, height: 50},
        activeTintColor: '#fff',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="search1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarLabel: 'Your Library',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
