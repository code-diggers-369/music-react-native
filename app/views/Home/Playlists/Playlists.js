import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Chase, Flow, Plane, Wave} from 'react-native-animated-spinkit';

// import fetchPlayListData
import {getPlaylists} from '../../../utils/fetchData/fetchPlaylists';

// import component
import Playlist from '../../../components/Playlist/Playlist';

const {height} = Dimensions.get('screen');

export default function Playlists() {
  const [playlistData, setPlaylistData] = useState([]);

  useEffect(async () => {
    const data = await getPlaylists();

    data.map(l => {
      l.songsList.map(a => console.log(a.type));
    });

    setPlaylistData(data);
  }, []);

  return (
    <View>
      {playlistData.length > 0 ? (
        playlistData.map((list, index) => {
          return <Playlist listData={list} key={index} />;
        })
      ) : (
        <View style={style.loadingContainer}>
          <Wave color="#222327" size={70} />
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  loadingText: {
    color: '#fff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
  },
});
