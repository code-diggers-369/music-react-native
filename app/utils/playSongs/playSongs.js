import spotifyWebApi from '../../auth/Spotify';
import {remote as spotifyAppRemote} from 'react-native-spotify-remote';
import {Audio} from 'expo-av';

const PlaySong = async uri => {
  try {
    // spotifyAppRemote.queueUri(uri).catch(e => console.log(e));
    // await spotifyAppRemote.playUri(uri);

    const {sound} = await Audio.Sound.createAsync(
      {uri: uri},
      {shouldPlay: true},
      status => console.log(status),
    );

    await sound.loadAsync();
  } catch (err) {
    console.log(err);
  }
};

export {PlaySong};
