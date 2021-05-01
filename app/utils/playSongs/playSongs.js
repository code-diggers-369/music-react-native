import MusicPlayer from 'react-native-video';
import spotify from '../../auth/Spotify';

const PlaySong = data => {
  try {
    spotify
      .play({context_uri: 'spotify:album:7z2o4dX5R8pljWfRbDnjj2'})
      .then(data => {
        console.log(data);
      });

    console.log('done');
  } catch (err) {
    console.log(err);
  }
};

export {PlaySong};
