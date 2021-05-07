import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect, useSelector} from 'react-redux';
import shortText from 'text-ellipsis';
import TrackPlayer, {usePlaybackState} from 'react-native-track-player';
import MarqueeText from 'react-native-text-ticker';
import {useNavigation} from '@react-navigation/native';

// import color
import Color from '../../utils/colors';

function BottomMusicWidget(props) {
  const [isSongIsPlaying, setisSongIsPlaying] = useState(false);
  const navigation = useNavigation();

  const playBack = useSelector(state => state.playback);
  const {artwork, title, id, artist} = playBack.currentTrack;

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
          <TouchableOpacity onPress={() => navigation.navigate('PlayerPage')}>
            <Image
              source={
                artwork ? {uri: artwork} : require('../../assets/logo.png')
              }
              style={style.image}
            />
          </TouchableOpacity>

          <View style={style.rightContainer}>
            <TouchableOpacity
              style={style.nameContainer}
              onPress={() => navigation.navigate('PlayerPage')}>
              <View>
                <MarqueeText
                  style={style.title}
                  duration={15000}
                  loop
                  repeatSpacer={50}
                  marqueeDelay={1000}>
                  {title}
                </MarqueeText>
                <MarqueeText
                  style={style.artist}
                  duration={20000}
                  loop
                  repeatSpacer={50}
                  marqueeDelay={1000}>
                  {artist}
                </MarqueeText>
                {/* <Text style={style.title}>{shortText(title, 27)}</Text>
              <Text style={style.artist}>{shortText(artist, 30)}</Text> */}
              </View>
            </TouchableOpacity>

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
    // flexDirection: 'row',
    // alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 80,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  artist: {
    color: 'grey',
    fontSize: 13,
  },
});

export default BottomMusicWidget;
