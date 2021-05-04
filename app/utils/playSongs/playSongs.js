import spotifyWebApi from '../../auth/Spotify';

const PlaySong = async uri => {
  try {
    // spotifyAppRemote.queueUri(uri).catch(e => console.log(e));
    // await spotifyAppRemote.playUri(uri);
  } catch (err) {
    console.log(err);
  }
};

export {PlaySong};
