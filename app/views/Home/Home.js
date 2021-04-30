import React, {useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

// import spotify
import spotify from '../../auth/Spotify';

// import colors
import Colors from '../../utils/colors';

// import screen
import Playlist from './Playlists/Playlists';

export default function Home() {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView style={style.scrollView}>
        <Playlist />
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Color1,
  },
  scrollView: {
    marginBottom: 80,
  },
});
