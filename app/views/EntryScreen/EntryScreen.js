import React, {Component} from 'react';
import {Text, View} from 'react-native';

//Authentication handler
import AuthenticationHandler from '../../auth/AuthenticationHandler';
import {loginAndroidAuth} from '../../auth/SpotifyAppAuth';
import spotify from '../../auth/Spotify';

// import screens
import BottomNavigation from '../../navigation/bottomNavigation';
import BottomMusicWidget from '../BottomMusicWidget/BottomMusicWidget';
import SplashScreen from '../SplashScreen/SplashScreen';

//Redux imports
import {connect} from 'react-redux';
import {
  setAccessToken,
  setRefreshToken,
  setLoadingTrue,
  setLoadingFalse,
} from '../../redux/reducers/authenticationSlice';

//Navigations
import LoginScreen from '../Login/Login';

class EntryScreen extends Component {
  state = {refreshToken: '', showSplashScreen: true};

  async componentDidMount() {
    try {
      if (!this.props.accessToken && this.props.refreshToken) {
        const authCredialData = await this.tryAutoLogin();
        console.log('component did mount called');

        spotify.setClientId('f68730b1dd1a40c2b8b30e8b9b58dcc1');
        spotify.setClientSecret('fc8ae26bd0484b1ca5cde7bd0d799ff5');

        spotify.setAccessToken(authCredialData.accessToken);
      }

      setTimeout(() => {
        this.setState({
          showSplashScreen: false,
        });
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  }

  async componentDidUpdate(prevProps) {
    try {
      if (
        this.props.refreshToken !== prevProps.refreshToken &&
        !this.props.accessToken
      ) {
        this.tryAutoLogin();
      }
      if (this.props.accessToken !== prevProps.accessToken) {
        this.props.setLoadingFalse();
      }

      spotify.setClientId('f68730b1dd1a40c2b8b30e8b9b58dcc1');
      spotify.setClientSecret('fc8ae26bd0484b1ca5cde7bd0d799ff5');

      spotify.setAccessToken(this.props.accessToken);

      console.log('Component did update called');
    } catch (err) {
      console.log(err);
    }
  }

  tryAutoLogin = async () => {
    this.props.setLoadingTrue();

    const authHandler = new AuthenticationHandler();

    const authenticationObject = await authHandler.refreshLogin(
      this.props.refreshToken,
    );

    this.props.setAccessToken({
      accessToken: authenticationObject.accessToken,
    });
    this.props.setRefreshToken({
      refreshToken: authenticationObject.refreshToken,
    });

    this.props.setLoadingFalse();

    return authenticationObject;
  };

  render() {
    const {accessToken, loading} = this.props.authentication;

    if (this.state.showSplashScreen) {
      return <SplashScreen />;
    }

    // if (loading) {
    //   return (
    //     <View
    //       style={{
    //         flex: 1,
    //         backgroundColor: '#000',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}>
    //       <Text style={{color: '#fff'}}>Loading</Text>
    //     </View>
    //   );
    // }

    if (accessToken) {
      return (
        <View style={{flex: 1}}>
          <BottomNavigation />
          <BottomMusicWidget />
        </View>
      );
    }

    return <LoginScreen />;
  }
}

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
    accessToken: state.authentication.accessToken,
    refreshToken: state.authentication.refreshToken,
  };
};

const mapDispatchToProps = {
  setAccessToken,
  setRefreshToken,
  setLoadingTrue,
  setLoadingFalse,
};

export default connect(mapStateToProps, mapDispatchToProps)(EntryScreen);
