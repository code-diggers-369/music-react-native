import spotify from '../../auth/Spotify';

const getProfileData = async () => {
  try {
    const userData = await spotify.getMe();
    // const userData = await spotify.getMyRecentlyPlayedTracks();
    // const userData = await spotify.getMySavedAlbums();
    // const userData = await spotify.getMySavedTracks();
    // const userData = await spotify.getMyTopTracks();

    return userData.body;
  } catch (err) {
    console.log(err);
  }
};

export {getProfileData};
