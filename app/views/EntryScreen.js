import React, {Component} from 'react';
import {Text, View} from 'react-native';

//Authentication handler
import authHandler from '../auth/AuthenticationHandler';

// import screens
import BottomNavigation from '../navigation/bottomNavigation';
import BottomMusicWidget from '../views/BottomMusicWidget';

//Redux imports
import {connect} from 'react-redux';
import {
  setAccessToken,
  setRefreshToken,
  setLoadingTrue,
  setLoadingFalse,
} from '../auth/authenticationSlice';

//Navigations
import LoginScreen from './Login';

class EntryScreen extends Component {
  state = {refreshToken: ''};

  componentDidUpdate(prevProps) {
    if (
      this.props.refreshToken !== prevProps.refreshToken &&
      !this.props.accessToken
    ) {
      this.tryAutoLogin();
    }
    if (this.props.accessToken !== prevProps.accessToken) {
      this.props.setLoadingFalse();
    }
  }

  tryAutoLogin = async () => {
    this.props.setLoadingTrue();
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
  };

  render() {
    const {accessToken, loading} = this.props.authentication;

    if (loading) {
      return <Text>Loading</Text>;
    }

    if (!accessToken) {
      return <LoginScreen />;
    } else {
      return (
        <View style={{flex: 1}}>
          <BottomNavigation />
          <BottomMusicWidget />
        </View>
      );
    }
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
