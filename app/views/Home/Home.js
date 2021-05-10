import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  BackHandler,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';

// import colors
import Colors from '../../utils/colors';

// import screen
import OtherPlaylist from './OtherPlaylists/OtherPlaylists';

export default function Home() {
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    return async () => {
      await TrackPlayer.destroy();
      console.log('bye  bye');
    };
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        // style={style.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => setRefreshPage(!refreshPage)}
          />
        }>
        <OtherPlaylist refreshPage={refreshPage} />

        <View style={style.botomView}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Color1,
  },
  botomView: {
    marginBottom: 80,
  },
});
