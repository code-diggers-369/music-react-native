import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

// import fetchPlayListData
import {getPlaylists} from '../../../utils/fetchData/fetchPlaylists';

// import component
import Playlist from '../../../components/Playlist/Playlist';

const {height} = Dimensions.get('screen');

export default function Playlists() {
  const [playlistData, setPlaylistData] = useState([]);

  useEffect(async () => {
    // const data = await getPlaylists();
    // setPlaylistData(data);
  }, []);

  return (
    <View>
      {playlistData.length > 0 ? (
        playlistData.map((list, index) => {
          return <Playlist listData={list} key={index} />;
        })
      ) : (
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" animating={true} />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
  },
});
