import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {remote} from 'react-native-spotify-remote';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import color
import Color from '../../utils/colors';

export default function BottomMusicWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songData, setSongData] = useState({});

  useEffect(async () => {
    try {
      remote.on('playerStateChanged', playerState => {
        if (playerState.isPaused) {
          setIsPlaying(false);
        } else {
          setIsPlaying(true);
        }
      });

      remote.on('playerContextChanged', playerContext => {
        setSongData({
          name: playerContext.title,
          // artist: playerContext.uri,
        });
      });

      // setSongData({
      //   name: playerState.track.album.name,
      //   artist: playerState.track.artist.name,
      // });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const resumeSong = () => {
    try {
      remote.resume();
    } catch (err) {
      console.log(err);
    }
  };

  const pauseSong = () => {
    try {
      remote.pause();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={style.absoluteContainer}>
      <Image source={require('../../assets/logo.png')} style={style.image} />

      <View style={style.rightContainer}>
        <View style={style.nameContainer}>
          <Text style={style.title}>{songData.name}</Text>
          <Text style={style.artist}>{songData.artist}</Text>
        </View>

        <View style={style.iconContainer}>
          {/* <AntDesign name="hearto" size={30} color="#fff" /> */}
          {isPlaying ? (
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
    marginLeft: 15,
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
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  artist: {
    color: 'grey',
    fontSize: 18,
  },
});
