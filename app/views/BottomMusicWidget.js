import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// import color
import Color from '../utils/colors';

export default function BottomMusicWidget() {
  return (
    <View style={style.absoluteContainer}>
      <Image source={require('../assets/logo.png')} style={style.image} />

      <View style={style.rightContainer}>
        <View style={style.nameContainer}>
          <Text style={style.title}>Title</Text>
          <Text style={style.artist}>Artist</Text>
        </View>

        <View style={style.iconContainer}>
          <AntDesign name="hearto" size={30} color="#fff" />
          <FontAwesome5 name="play" size={30} color="#fff" />
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
