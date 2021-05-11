import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import MarqueeText from 'react-native-text-ticker';
import {useNavigation} from '@react-navigation/native';
import {Wave} from 'react-native-animated-spinkit';

//
import Color from '../../utils/colors';
import artWork from '../../assets/logo.png';

//
const {width} = Dimensions.get('screen');

export default function SearchResult({
  searchDataResult,
  setPageNo,
  pageNo,
  isLoading,
}) {
  const navigation = useNavigation();

  const renderItems = ({item, index}) => {
    var artistName = item.artists
      .map(ls => ls.name)
      .join()
      .replace(',', ', ');

    if (item.images[0].url) {
      return (
        <TouchableOpacity
          style={style.cardContainer}
          onPress={() =>
            navigation.navigate('AlbumPage', {
              data: item,
            })
          }>
          <Image style={style.songArtwork} source={{uri: item.images[0].url}} />

          <View>
            <Text style={style.songName}>{item.name}</Text>
            <MarqueeText
              style={style.artistsName}
              duration={20000}
              loop
              repeatSpacer={50}
              marqueeDelay={1000}>
              {artistName}
            </MarqueeText>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <TouchableOpacity
        onPress={() => setPageNo(pageNo + 1)}
        style={{
          alignItems: 'center',
          backgroundColor: Color.Color5,
          borderRadius: 10,
          marginHorizontal: 10,
          marginVertical: 20,
          marginBottom: 100,
          padding: 10,
        }}>
        {!isLoading ? (
          <Text style={{color: '#fff'}}>More</Text>
        ) : (
          <Wave color="#fff" size={19} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      {searchDataResult.length > 0 ? (
        <View style={style.container}>
          <FlatList
            data={searchDataResult}
            renderItem={renderItems}
            keyExtractor={(item, index) => index.toString()}
            enableEmptySections={true}
            ListFooterComponent={renderFooter}
          />
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {},
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
    width: '75%',
  },
  songArtwork: {
    height: 60,
    width: 60,
    borderRadius: 7,
    marginRight: 10,
  },
  songName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  artistsName: {
    color: 'grey',
    fontSize: 12,
  },
});
