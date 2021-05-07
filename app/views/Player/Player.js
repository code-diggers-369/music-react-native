import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {useSelector, useDispatch} from 'react-redux';
import MarqueeText from 'react-native-text-ticker';
import TrackPlayer, {useTrackPlayerProgress} from 'react-native-track-player';

//
import {
  setPlayback,
  setCurrentTrack,
  setLoop,
  setShuffle,
  setQueueTrack,
} from '../../redux/actions/playback';

//
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

//
import Color from '../../utils/colors';

//
import CoverImg from '../../assets/logo.png';

const {width} = Dimensions.get('screen');

export default function Player({navigation}) {
  const [viewSleepTimer, setViewSleepTimer] = useState(false);
  const [sleepTimer, setSleepTimer] = useState(1);
  var time;
  let flag = false;

  const {
    currentTrack,
    loop,
    shuffle,
    isPlaying,
    queue,
    queueSong,
  } = useSelector(state => state.playback);

  const dispatch = useDispatch();

  const {artwork, title, artist} = currentTrack;
  var progress = useTrackPlayerProgress();

  //
  //
  //

  function secToTime(secs) {
    if (secs < 0) {
      return '0:00';
    }
    let minutes = Math.floor(secs / 60);
    let seconds = Math.floor(secs % 60);
    return seconds <= 9 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`;
  }

  const seekTo = value => {
    TrackPlayer.seekTo(value);
  };

  const getRandomNumber = (starting, ending) => {
    return Math.floor(Math.random() * ending);
  };

  const backgroundPlayback = async track => {
    try {
      if (flag) return;
      flag = true;
      setTimeout(() => (flag = false), 250);
      await TrackPlayer.reset();
      await TrackPlayer.add(track);
      dispatch({type: 'current_track', payload: track});
      TrackPlayer.play();
      dispatch({type: 'set_playback', payload: true});
    } catch (err) {
      console.log(err);
    }
  };

  //

  async function skipToNext() {
    try {
      if (queueSong.length <= 1) {
        return;
      }

      const index = queueSong.findIndex(data => data.id === currentTrack.id);

      backgroundPlayback(
        shuffle
          ? queueSong[getRandomNumber(0, queueSong.length)]
          : index === queueSong.length - 1
          ? queueSong[0]
          : queueSong[index + 1],
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function skipToPrevious() {
    try {
      if (progress.position < 20) {
        if (queueSong.length <= 1) {
          return;
        }

        const index = queueSong.findIndex(
          // data => data.index === currentTrack.index,
          data => data.id === currentTrack.id,
        );

        backgroundPlayback(
          shuffle
            ? queueSong[getRandomNumber(0, queueSong.length)]
            : index === 0
            ? queueSong[queueSong.length - 1]
            : queueSong[index - 1],
        );
      } else {
        TrackPlayer.seekTo(0);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function onShufflePress() {
    dispatch(setShuffle(!shuffle));
  }

  function onLoopPress() {
    dispatch(setLoop(!loop));
  }

  async function setTrack() {
    try {
      const data = await TrackPlayer.getCurrentTrack();
      if (data === null) await TrackPlayer.add(currentTrack);
    } catch (err) {
      console.log(err);
    }
  }

  function setTime() {
    try {
      clearTimeout(time);

      var convertToSeconds = sleepTimer * 60 * 1000;

      alert('Timer Is Set');
      setViewSleepTimer(false);

      var interval = setInterval(() => {
        setSleepTimer(sleepTimer - 1);
        console.log(sleepTimer);
      }, 60000);

      time = setTimeout(async () => {
        await TrackPlayer.stop();
        clearInterval(interval);
      }, convertToSeconds);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.Color0}}>
      <ImageBackground
        style={styles.contanier}
        source={{uri: artwork}}
        blurRadius={50}
        fadeDuration={10}>
        <View style={{flex: 1, backgroundColor: 'rgba( 0, 0, 0, 0.4)'}}>
          <View style={styles.mainbar}>
            <TouchableOpacity
              style={{marginLeft: '5%'}}
              onPress={() => navigation.goBack()}>
              <AntDesign name="down" size={24} style={{color: '#fff'}} />
            </TouchableOpacity>

            <Text style={styles.now_playing_text}> Now Playing </Text>

            <TouchableOpacity
              onPress={() => setViewSleepTimer(!viewSleepTimer)}>
              <Feather
                style={{marginRight: '5%'}}
                name="moon"
                size={22}
                color={'#fff'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.music_logo_view}>
            {artwork ? (
              <Image source={{uri: artwork}} style={styles.image_view} />
            ) : (
              <Image source={CoverImg} style={styles.image_view} />
            )}
          </View>

          <View style={styles.name_of_song_View}>
            <MarqueeText
              style={styles.name_of_song_Text1}
              duration={20000}
              loop
              repeatSpacer={50}
              marqueeDelay={1000}>
              {title}
            </MarqueeText>

            <MarqueeText
              style={{
                // color: '#7f7f7f',
                color: '#fff',
                opacity: 0.8,
                marginTop: 4,
                textAlign: 'center',
              }}
              duration={20000}
              loop
              repeatSpacer={50}
              marqueeDelay={1000}>
              {artist}
            </MarqueeText>

            {/* <Text style={styles.name_of_song_Text1}>{title}</Text> */}
            {/* <Text style={styles.name_of_song_Text2}>
          {artist ? artist : 'Unknown'}
        </Text> */}
          </View>

          <View style={styles.slider_view}>
            <Text style={styles.slider_time}>
              {' '}
              {secToTime(progress.position)}
            </Text>
            <Slider
              style={styles.slider_style}
              minimumValue={0}
              maximumValue={progress.duration}
              // minimumTrackTintColor="#7f7f7f"
              minimumTrackTintColor="rgba(255,255,255,0.7)"
              // maximumTrackTintColor="#d3d3d3"
              maximumTrackTintColor="rgba(255,255,255,0.7)"
              thumbTintColor="#d6d6d6"
              value={progress.position}
              onValueChange={time => seekTo(time)}
            />
            <Text style={styles.slider_time}>
              {secToTime(progress.duration)}
            </Text>
          </View>

          <View style={styles.functions_view}>
            <TouchableOpacity onPress={() => onShufflePress()}>
              <Entypo
                name="shuffle"
                size={24}
                color={
                  shuffle ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.3)'
                }
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => skipToPrevious()}>
              {/* <Entypo name="controller-fast-backward" size={24} color="#7f7f7f" /> */}
              <Feather
                name="skip-back"
                size={22}
                color={'rgba(255,255,255,0.8)'}
              />
            </TouchableOpacity>
            {/*  */}
            <TouchableOpacity
              onPress={() => {
                if (isPlaying) {
                  TrackPlayer.pause();
                } else {
                  TrackPlayer.play();
                }
                dispatch(setPlayback(!isPlaying));
                setTrack();
              }}>
              <AntDesign
                name={isPlaying ? 'pausecircle' : 'play'}
                size={50}
                color="rgba(255,255,255,0.8)"
              />
            </TouchableOpacity>
            {/*  */}
            <TouchableOpacity onPress={() => skipToNext()}>
              {/* <Entypo name="controller-fast-forward" size={24} color="#7f7f7f" /> */}
              <Feather
                name="skip-forward"
                size={22}
                color={'rgba(255,255,255,0.8)'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onLoopPress()}>
              <Feather
                name="repeat"
                size={20}
                color={loop ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.3)'}
              />
            </TouchableOpacity>
          </View>

          {viewSleepTimer ? (
            <View style={styles.sleepTimeContainer}>
              <Text style={{fontSize: 20}}>Set Sleep Time</Text>
              <Slider
                style={{
                  width: width - 20,
                  marginTop: 25,
                }}
                minimumValue={1}
                maximumValue={30}
                // minimumTrackTintColor="#7f7f7f"
                minimumTrackTintColor="#000000"
                // maximumTrackTintColor="#d3d3d3"
                maximumTrackTintColor="#7f7f7f"
                thumbTintColor="#d6d6d6"
                value={sleepTimer}
                onValueChange={value => setSleepTimer(Math.floor(value))}
              />

              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>{sleepTimer} </Text>
                <Text> Minutes Remaining</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-around',
                  marginTop: 30,
                }}>
                <TouchableOpacity
                  style={{
                    // backgroundColor: '#795548',
                    backgroundColor: Color.Color1,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                    marginRight: 15,
                  }}
                  onPress={() => setTime()}>
                  <Text style={{color: '#fff'}}>Set</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    // backgroundColor: '#795548',
                    backgroundColor: Color.Color3,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => setViewSleepTimer(false)}>
                  <Text style={{color: '#fff'}}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

//

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: 'space-around',
    // backgroundColor: '#141D10',
    backgroundColor: Color.Color0,
  },
  sleepTimeContainer: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    backgroundColor: '#bfbdbd',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    paddingVertical: 20,
  },
  mainbar: {
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  now_playing_text: {
    fontSize: 19,
    // color: '#bfbdbd',
    color: '#fff',
  },

  music_logo_view: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image_view: {
    height: '100%',
    width: '80%',
    borderRadius: 20,
    opacity: 0.8,
    backgroundColor: '#232b20',
  },

  name_of_song_View: {
    height: '15%',
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  name_of_song_Text1: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: '#bfbdbd',
    color: '#fff',
    textAlign: 'center',
  },

  name_of_song_Text2: {
    // color: '#808080',
    color: '#7f7f7f',
    marginTop: '4%',
    textAlign: 'center',
  },

  slider_view: {
    height: '10%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  slider_style: {
    height: '70%',
    width: '65%',
  },

  slider_time: {
    fontSize: 15,
    // color: '#808080',
    color: '#fff',
    // color: '#7f7f7f',
  },

  functions_view: {
    flexDirection: 'row',
    height: '10%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
});
