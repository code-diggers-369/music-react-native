import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

// import colors
import Colors from '../../utils/colors';

// import screen
import OtherPlaylist from './OtherPlaylists/OtherPlaylists';

export default function Home() {
  const [refreshPage, setRefreshPage] = useState(false);

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
