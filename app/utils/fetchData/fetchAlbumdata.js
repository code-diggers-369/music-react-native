import moment from 'moment';
import spotify from '../../auth/Spotify';

const getAlbumData = async (id, imageUrl) => {
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
        external_urls: list.external_urls.spotify,
        imageUrl: imageUrl,
      };
    });

    var tempTime = moment.utc(totalDuration);

    return {
      id: id,
      name: name,
      label: label,
      tracks: dataArray,
      totalDuration: `${tempTime.format('HH')}:${tempTime.format(
        'mm',
      )}:${tempTime.format('ss')}`,
    };
  } catch (err) {
    console.log(err);
  }
};

const getAlbumImage = async uri => {
  try {
    var data = await spotify.getMyCurrentPlayingTrack();
    const image = await data.body.item.album.images[0].url;

    return image;
  } catch (err) {
    console.log(err);
  }
};

export {getAlbumData, getAlbumImage};
