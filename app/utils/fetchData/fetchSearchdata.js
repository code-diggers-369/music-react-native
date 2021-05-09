import moment from 'moment';
import spotify from '../../auth/Spotify';

const getSearchdata = async (search, pageNo) => {
  try {
    const data = await spotify.searchAlbums(search, {
      offset: pageNo,
    });

    const {albums} = data.body;

    const dataArray = albums.items.map(list => {
      return {
        id: list.id,
        name: list.name,
        uri: list.uri,
        artists: list.artists,
        external_urls: list.external_urls.spotify,
        images: list.images,
      };
    });

    return dataArray;
  } catch (err) {
    console.log(err);
  }
};

export {getSearchdata};
