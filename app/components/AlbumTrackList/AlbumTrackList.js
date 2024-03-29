import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Wave} from 'react-native-animated-spinkit';
import {PlaySong} from '../../utils/playSongs/playSongs';

// get dimention
const {height, width} = Dimensions.get('screen');

export default function AlbumTrackList({data, setIsLoading}) {
  const [showList, setShowList] = useState(false);

  useEffect(async () => {
    setTimeout(() => {
      setShowList(true);
    }, 700);
  }, []);

  return (
    <View>
      {showList && data.tracks.length > 0 ? (
        <View style={{marginVertical: 30}}>
          <View style={style.durationTotalSongContainer}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>
              {data.tracks.length}
              {'  '}
              Songs
            </Text>

            <Text style={{fontWeight: 'bold', color: '#fff'}}>
              {data.totalDuration}
            </Text>
          </View>
          {data.tracks.map((list, i) => {
            var artistName = list.artists
              .map(ls => ls.name)
              .join()
              .replace(',', ', ');

            return (
              <TouchableOpacity
                onPress={async () => {
                  setIsLoading(true);
                  await PlaySong(list);
                  setIsLoading(false);
                }}
                key={i}
                style={style.listContainer}>
                <Text style={style.songTitle}>{list.name}</Text>
                <Text style={style.artistsName}>{artistName}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View style={style.loadingContainer}>
          <Wave color="#fff" size={70} />
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  loadingText: {
    color: '#fff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  listContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    width: width / 1.4,
  },
  artistsName: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.7,
  },
  durationTotalSongContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
});
