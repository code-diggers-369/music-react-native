// import spotifyWebApi from '../../auth/Spotify';
import TrackPlayer from 'react-native-track-player';
import {SetCurrentTrack} from '../../redux/actions/playback';
import Axios from 'axios';

const PlaySong = async data => {
  try {
    const {name, imageUrl, artists} = data;

    const artistsName = artists
      .map(ls => ls.name)
      .join()
      .replace(',', ', ');

    console.log('start from here');

    const responseData = await Axios({
      method: 'post',
      url: 'https://confirmed-brief-roadway.glitch.me/fetchinfo',
      data: {
        title: name,
        artistsName: artistsName,
      },
    });

    const songDataObj = {
      id,
      url: responseData.data.url,
      title: name,
      artist: artistsName,
      artwork: imageUrl,
    };

    await SetCurrentTrack(songDataObj);
  } catch (err) {
    console.log(err);
  }
};

export {PlaySong};
