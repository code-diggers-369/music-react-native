import spotifyWebApi from '../../auth/Spotify';
import {remote as spotifyAppRemote} from 'react-native-spotify-remote';

const PlaySong = async uri => {
  try {
    spotifyAppRemote.queueUri(uri).catch(e => console.log(e));
    await spotifyAppRemote.playUri(uri);

    console.log('done');
  } catch (err) {
    console.log(err);
  }
};

export {PlaySong};
