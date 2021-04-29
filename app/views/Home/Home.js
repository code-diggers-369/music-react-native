import React, {useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';

// import spotify
import spotify from '../../auth/Spotify';

// import colors
import Colors from '../../utils/colors';

export default function Home() {
  return (
    <SafeAreaView style={style.container}>
      <Text>This Is Home</Text>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Color1,
  },
});
