import spotify from '../../auth/Spotify';

const getPlaylists = async () => {
  try {
    const playlistSamples = [
      'bollywood',
      'sad hindi',
      'love hindi',
      'hindi rap song',
      'bollywood 2020',
      'arijit songs',
      'electronic',
      'alan walker',
      'shreya ghoshal',
      'honey singh',
      'sonu nigam',
      'mika singh',
      'neha kakkar',
      'shaan',
      'shirley setia',
      'gujarati',
    ];

    const playlistArray = [];

    for (let i = 0; i < 5; i++) {
      const pageNo = Math.floor(Math.random() * 31);
      const playlistName =
        playlistSamples[Math.floor(Math.random() * playlistSamples.length)];

      const data = await spotify.searchPlaylists(playlistName, {
        limit: 1,
        country: 'IN',
        offset: pageNo,
      });

      if (data.body.playlists.items.length > 0) {
        playlistArray.push({
          playlistId: data.body.playlists.items[0].id,
          playlistOwnerId: data.body.playlists.items[0].owner.id,
          playlistName: data.body.playlists.items[0].name,
        });
      }
    }
    const finalPlaylistData = [];

    for (let i = 0; i < playlistArray.length; i++) {
      const ls = playlistArray[i];
      const songsList = await getSongs(ls);

      finalPlaylistData.push({
        id: ls.playlistId,
        name: ls.playlistName,
        songsList: songsList,
      });
    }

    return finalPlaylistData;
  } catch (err) {
    console.log(err);
  }
};

const getSongs = async playlistData => {
  try {
    const pageNo = Math.floor(Math.random() * 11);

    const data = await spotify.getPlaylistTracks(
      playlistData.playlistOwnerId,
      playlistData.playlistId,
      {limit: 10, country: 'IN', offset: pageNo},
    );

    const tempData = data.body.items.map(ls => {
      return {
        id: ls.track.album.id,
        name: ls.track.album.name,
        images: ls.track.album.images,
        type: ls.track.album.type,
        uri: ls.track.album.uri,
      };
    });

    return tempData;

    // console.log(data.body.items[0].track.album.images,data.body.items[0].track.album.name);
  } catch (err) {
    console.log(err);
  }
};

export {getPlaylists};
