import moment from 'moment';
import spotify from '../../auth/Spotify';

const getAlbumData = async id => {
  try {
    const data = await spotify.getAlbum(id);

    const {name, label, tracks} = data.body;

    var totalDuration = 0;

    const dataArray = tracks.items.map(list => {
      totalDuration += list.duration_ms;
      return {
        id: list.id,
        name: list.name,
        duration: list.duration_ms,
        uri: list.uri,
        artists: list.artists,
      };
    });

    var tempTime = moment.duration(totalDuration);

    return {
      id: id,
      name: name,
      label: label,
      tracks: dataArray,
      totalDuration: `${tempTime.hours()}:${tempTime.minutes()}:${tempTime.seconds()}`,
    };
  } catch (err) {
    console.log(err);
  }
};

export {getAlbumData};
