import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// get album data from api
import {getAlbumData} from '../../utils/fetchData/fetchAlbumdata';
import {PlaySong} from '../../utils/playSongs/playSongs';

// import componets
import AlbumTrackList from '../../components/AlbumTrackList/AlbumTrackList';

// get dimenstion
var {height, width} = Dimensions.get('window');

// import colors
import Colors from '../../utils/colors';

//
export default function AlbumPage({route, navigation}) {
  const {data} = route.params;
  const {goBack} = navigation;

  const [allTrackDataInAlbum, setAllTrackDataInAlbum] = useState({});

  useEffect(async () => {
    try {
      const albumData = await getAlbumData(data.id, data.images[0].url);

      setAllTrackDataInAlbum(albumData);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const playAllSongs = async () => {
    try {
      console.log('add ti queue');
      // const songUri = await data.uri;

      // PlaySong(songUri);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.posterContainer}>
          <Image style={styles.headerImg} source={{uri: data.images[0].url}} />

          <LinearGradient
            locations={[0.45, 0.7]}
            colors={['rgba(0, 0, 0, 0.3)', 'rgba( 0, 0, 0, 0.7)']}
            style={styles.linearGradient}>
            <View style={styles.topMenuContainer}>
              <TouchableOpacity onPress={() => goBack()}>
                <View style={styles.backbutton}>
                  <AntDesign name="arrowleft" color={'#fff'} size={30} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.detailTitleContainer}>
              <View style={{width: width / 1.5}}>
                <Text style={styles.detailTitle}>
                  {allTrackDataInAlbum.name}
                </Text>
                <Text style={styles.detailSubTitle}>
                  {allTrackDataInAlbum.label}
                </Text>
              </View>
              <View style={styles.detailPlayButtonContainer}>
                <TouchableOpacity
                  onPress={() => playAllSongs()}
                  style={styles.detailPlayButton}>
                  <FontAwesome5
                    style={styles.detailPlayButtonIcon}
                    name="play"
                    size={20}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </View>

        <AlbumTrackList data={allTrackDataInAlbum} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.Color0,
    backgroundColor: '#000',
    zIndex: 1,
  },
  headerImg: {
    height: 400,
    width: width,
    zIndex: 0,
  },
  posterContainer: {
    backgroundColor: '#000',
    height: 400,
  },
  linearGradient: {
    marginTop: -400,
    height: 400,
    width: width,
    zIndex: 10,
    flex: 1,
  },
  detailTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  detailTitle: {
    fontFamily: 'Raleway-ExtraBold',
    fontSize: 20,
    color: '#fff',
    paddingTop: 150,
    paddingBottom: 5,
    marginLeft: 10,
    zIndex: 99,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    fontWeight: '700',
  },
  detailSubTitle: {
    fontFamily: 'Raleway-Regular',
    fontSize: 13,
    color: '#fff',
    marginLeft: 10,
    paddingBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  detailPlayButton: {
    height: 55,
    width: 55,
    borderRadius: 27.5,
    // backgroundColor: '#D90850',
    backgroundColor: Colors.Color5,
  },
  detailPlayButtonContainer: {
    paddingTop: 150,
    paddingBottom: 5,
    marginRight: 10,
  },
  detailPlayButtonIcon: {
    // height: 30,
    // width: 30,
    marginTop: 16,
    marginLeft: 20,
  },
  topMenuContainer: {
    paddingTop: 20,
    zIndex: 99,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  backbutton: {
    height: 32,
    width: 32,
    marginLeft: 15,
  },
});
