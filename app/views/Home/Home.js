import React, {useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

// import colors
import Colors from '../../utils/colors';

// import screen
import OtherPlaylist from './OtherPlaylists/OtherPlaylists';

export default function Home() {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView style={style.scrollView}>
        <OtherPlaylist />
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
