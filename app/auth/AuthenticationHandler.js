import {authorize, refresh} from 'react-native-app-auth';
// import Storage from '@react-native-community/async-storage';

class AuthenticationHandler {
  constructor() {
    this.spotifyAuthConfig = {
      clientId: 'f68730b1dd1a40c2b8b30e8b9b58dcc1',
      clientSecret: 'fc8ae26bd0484b1ca5cde7bd0d799ff5',
      redirectUrl: 'com.music://oauthredirect',
      // scopes: [
      //   'playlist-read-private',
      //   'playlist-modify-public',
      //   'playlist-modify-private',
      //   'user-library-read',
      //   'user-library-modify',
      //   'user-top-read',
      // ],
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
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    };
  }

  async onLogin() {
    try {
      const result = await authorize(this.spotifyAuthConfig);
      // alert(JSON.stringify(result));
      console.log(result);

      // await Storage.setItem('access-token', result.accessToken);
      return result;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  async refreshLogin(refreshToken) {
    const result = await refresh(this.spotifyAuthConfig, {
      refreshToken: refreshToken,
    });
    // await Storage.setItem('access-token', result.accessToken);
    return result;
  }
}

export default AuthenticationHandler;
