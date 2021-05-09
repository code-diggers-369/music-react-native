// import spotifyWebApi from '../../auth/Spotify';
import TrackPlayer from 'react-native-track-player';
import {
  SetCurrentTrack,
  setQueueTrack,
  setQueue,
} from '../../redux/actions/playback';
import Axios from 'axios';
import Restart from 'react-native-restart';

const getUrlFromServer = async tempData => {
  try {
    var timeout = setTimeout(() => {
      clearTimeout(timeout);
      return null;
    }, 20000);

    const responseData = await Axios({
      method: 'post',
      url: 'https://confirmed-brief-roadway.glitch.me/fetchinfo',
      data: {
        title: tempData.name,
        artistsName: tempData.artistsName,
      },
    });

    const songDataObj = {
      id: tempData.id,
      url: responseData.data.url,
      title: tempData.name,
      artist: tempData.artistsName,
      artwork: tempData.imageUrl,
    };

    return songDataObj;
  } catch (err) {
    console.log(err);
  }
};

const PlaySong = async data => {
  try {
    const {name, imageUrl, artists, id} = data;

    const artistsName = artists
      .map(ls => ls.name)
      .join()
      .replace(',', ', ');

    console.log('start from here');

    const songDataObj = await getUrlFromServer({
      id,
      name,
      artistsName,
      imageUrl,
    });

    await setQueueTrack(songDataObj);
  } catch (err) {
    console.log(err);
  }
};

const PlayAllSongs = async data => {
  try {
    const tempDataArray = [];

    if (data.length > 1) {
      for (let index = 0; index < data.length; index++) {
        const {name, imageUrl, artists, id} = data[index];

        const artistsName = artists
          .map(ls => ls.name)
          .join()
          .replace(',', ', ');

        const songDataObj = await getUrlFromServer({
          id,
          name,
          artistsName,
          imageUrl,
        });
        if (songDataObj != null) {
          tempDataArray.push(songDataObj);
          console.log(index + 1, ' song is added');
        } else {
          console.log('unavailable song', name);
        }
      }

      setQueue(tempDataArray);
      console.log('all songs are added');
    } else {
      await PlaySong(data[0]);
    }
  } catch (err) {
    Restart.Restart();

    console.log(err);
  }
};

export {PlaySong, PlayAllSongs};
