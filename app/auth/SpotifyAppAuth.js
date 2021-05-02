import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
  ApiScope,
  ApiConfig,
} from 'react-native-spotify-remote';

const loginAndroidAuth = async () => {
  try {
    const spotifyConfig = {
      clientID: 'f68730b1dd1a40c2b8b30e8b9b58dcc1',
      redirectURL: 'com.music://oauthredirect',
      tokenRefreshURL: 'https://accounts.spotify.com/api/token',
      tokenSwapURL: 'https://accounts.spotify.com/api/token',
      scopes: [
        'ugc-image-upload',
        'user-read-recently-played',
        'user-read-playback-state',
        'user-top-read',
        'app-remote-control',
        'playlist-modify-public',
        'user-modify-playback-state',
        'playlist-modify-private',
        'user-follow-modify',
        'user-read-currently-playing',
        'user-follow-read',
        'user-library-modify',
        'user-read-playback-position',
        'playlist-read-private',
        'user-read-email',
        'user-read-private',
        'user-library-read',
        'playlist-read-collaborative',
        'streaming',
      ],
    };

    const session = await SpotifyAuth.authorize(spotifyConfig);
    await SpotifyRemote.connect(session.accessToken);

    console.log('spotify app is connected success fully');

    await SpotifyRemote.on('remoteDisconnected', async () => {
      await loginAndroidAuth();
    });
  } catch (err) {
    console.log(err);
  }
};

export {loginAndroidAuth};
