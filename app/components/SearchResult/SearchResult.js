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

//
import Color from '../../utils/colors';

//
const {width} = Dimensions.get('screen');

export default function SearchResult({searchDataResult, setPageNo, pageNo}) {
  const navigation = useNavigation();

  const renderItems = ({item}) => {
    var artistName = item.artists
      .map(ls => ls.name)
      .join()
      .replace(',', ', ');

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
  };

  return (
    <View style={{flex: 1}}>
      {searchDataResult.length > 0 ? (
        <View style={style.container}>
          <FlatList
            data={searchDataResult}
            renderItem={renderItems}
            keyExtractor={item => item.id}
            onEndReached={() => setPageNo(pageNo + 1)}
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
