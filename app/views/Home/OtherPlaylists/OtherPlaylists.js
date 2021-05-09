import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Wave} from 'react-native-animated-spinkit';
import Restart from 'react-native-restart';

// import fetchPlayListData
import {getPlaylists} from '../../../utils/fetchData/fetchPlaylists';

// import component
import Playlist from '../../../components/Playlist/Playlist';

const {height} = Dimensions.get('screen');

export default function Playlists(props) {
  const [playlistData, setPlaylistData] = useState([]);

  useEffect(async () => {
    setPlaylistData([]);
    const data = await getPlaylists();

    setPlaylistData(data);
  }, [props.refreshPage]);

  try {
    return (
      <View>
        {playlistData &&
        playlistData != undefined &&
        playlistData.length > 0 ? (
          playlistData.map((list, index) => {
            if (list.songsList.length > 2) {
              return <Playlist listData={list} key={index} />;
            } else {
              return null;
            }
          })
        ) : (
          <View style={style.loadingContainer}>
            <Wave color="#fff" size={70} />
          </View>
        )}
      </View>
    );
  } catch (err) {
    console.log(err);
    Restart.Restart();
  }
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
