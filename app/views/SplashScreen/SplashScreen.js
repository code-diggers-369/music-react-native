import React from 'react';
import {Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import Colors from '../../utils/colors';

export default function SplashScreen() {
  return (
    <SafeAreaView style={style.container}>
      <Image
        source={require('../../assets/mainlogo2.png')}
        style={{width: 250, height: 250}}
      />

      <Text style={style.text}>Music</Text>

      <Text style={style.footer}>Made With ♥ In India</Text>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Color1,
  },
  text: {
    color: '#fff',
    fontSize: 35,
    marginTop: 10,
  },
  footer: {
    color: '#fff',
    position: 'absolute',
    bottom: 30,
  },
});
