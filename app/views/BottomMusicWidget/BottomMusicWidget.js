import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect, useSelector} from 'react-redux';
import shortText from 'text-ellipsis';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';

// import color
import Color from '../../utils/colors';

function BottomMusicWidget(props) {
  const [isSongIsPlaying, setisSongIsPlaying] = useState(false);

  const playBack = useSelector(state => state.playback);
  const {artwork, title, id} = playBack.currentTrack;

  const playbackState = usePlaybackState();

  useEffect(() => {
    switch (playbackState) {
      case TrackPlayer.STATE_PAUSED:
        setisSongIsPlaying(false);
        break;
      case TrackPlayer.STATE_PLAYING:
        setisSongIsPlaying(true);
        break;

      case TrackPlayer.STATE_STOPPED:
        setisSongIsPlaying(false);
        break;

      case TrackPlayer.STATE_NONE:
        setisSongIsPlaying(false);
        break;
    }
  }, [playbackState]);

  const resumeSong = async () => {
    try {
      if (id) {
        await TrackPlayer.play();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const pauseSong = async () => {
    try {
      if (id) {
        await TrackPlayer.pause();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      {playBack.currentTrack.title ? (
        <View style={style.absoluteContainer}>
          <Image
            source={artwork ? {uri: artwork} : require('../../assets/logo.png')}
            style={style.image}
          />

          <View style={style.rightContainer}>
            <View style={style.nameContainer}>
              <Text style={style.title}>{shortText(title, 35)}</Text>
              {/* <Text style={style.artist}>{songData.artist}</Text> */}
            </View>

            <View style={style.iconContainer}>
              {isSongIsPlaying ? (
                <TouchableOpacity onPress={() => pauseSong()}>
                  <FontAwesome5 name="pause" size={30} color="#fff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => resumeSong()}>
                  <FontAwesome5 name="play" size={30} color="#fff" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  absoluteContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    backgroundColor: Color.Color0,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: -1,
    alignItems: 'center',
  },
  image: {
    height: 75,
    width: 75,
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 100,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  artist: {
    color: 'grey',
    fontSize: 18,
  },
});

export default BottomMusicWidget;
