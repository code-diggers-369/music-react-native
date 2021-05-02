import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import shortText from 'text-ellipsis';
import {useNavigation} from '@react-navigation/native';

export default function Playlist({listData}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{listData.name}</Text>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.albumScrollContainer}>
        {listData
          ? listData.songsList.map((ls, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    navigation.navigate('AlbumPage', {
                      data: ls,
                    })
                  }>
                  <Image
                    style={styles.albumScrollImg}
                    source={{
                      uri: ls.images.length > 0 ? ls.images[0].url : null,
                    }}
                  />
                  <View style={styles.albumTextContainer}>
                    <View>
                      <Text style={styles.albumTextTitle}>
                        {shortText(ls.name, 40)}
                      </Text>
                      {/* <Text style={styles.albumTextYear}>{ls.year}</Text> */}
                    </View>
                    {/* <View>
                        <Image
                          style={styles.albumExpli}
                          source={require('../../../assets/logo.png')}
                        />
                      </View> */}
                  </View>
                </TouchableOpacity>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 10,
  },
  titleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  albumScrollImg: {
    height: 156,
    width: 156,
    marginLeft: 10,
    borderRadius: 7,
  },

  albumTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginLeft: 11,
    marginTop: 10,
    width: 156,
  },

  albumExpli: {
    height: 17.5,
    width: 17.5,
    marginRight: 2,
  },
  albumTextTitle: {
    fontFamily: 'Raleway-Bold',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
  },
  albumTextYear: {
    fontFamily: 'Raleway-Light',
    fontSize: 13,
    fontWeight: '100',
    color: '#fff',
  },

  smallAlbum: {
    width: 80,
    height: 80,
    borderRadius: 7,
  },
});
