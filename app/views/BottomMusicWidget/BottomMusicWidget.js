import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect, useSelector} from 'react-redux';
import moment from 'moment';
import shortText from 'text-ellipsis';

// import color
import Color from '../../utils/colors';

function BottomMusicWidget(props) {
  const [isSongIsChanged, setIsSongIsChanged] = useState(true);

  useEffect(async () => {
    try {
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
      {/* <Image
        source={
          props.currentSong.image
            ? {uri: props.currentSong.image}
            : require('../../assets/logo.png')
        }
        style={style.image}
      /> */}

      <View style={style.rightContainer}>
        <View style={style.nameContainer}>
          <Text style={style.title}>
            {/* {shortText(props.currentSong.name, 35)} */}
          </Text>
          {/* <Text style={style.artist}>{songData.artist}</Text> */}
        </View>

        <View style={style.iconContainer}>
          {!true ? (
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
