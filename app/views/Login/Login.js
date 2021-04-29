import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';

//
import AuthenticationHandler from '../../auth/AuthenticationHandler';
import spotify from '../../auth/Spotify';

//
import {
  setAccessToken,
  setRefreshToken,
  setSigingIn,
} from '../../auth/authenticationSlice';

// import colors
import Colors from '../../utils/colors';

//
const {height, width} = Dimensions.get('screen');

class LoginScreen extends Component {
  state = {};

  onPressLogin = async () => {
    const authHandler = new AuthenticationHandler();

    const authenticationObject = await authHandler.onLogin();
    this.props.setAccessToken({accessToken: authenticationObject.accessToken});
    this.props.setRefreshToken({
      refreshToken: authenticationObject.refreshToken,
    });
  };

  render() {
    return (
      <SafeAreaView style={style.container}>
        <ImageBackground
          style={style.backgroundImage}
          blurRadius={5}
          source={{
            uri:
              'https://images.unsplash.com/photo-1484876065684-b683cf17d276?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
          }}>
          <View>
            {/* <Image
              source={require('../../assets/logo2.png')}
              style={{width: 100, height: 100}}
            /> */}

            <Text style={style.text}>Music</Text>
          </View>

          <TouchableOpacity
            style={style.loginButton}
            onPress={this.onPressLogin}>
            <Text style={style.loginText}>LOGIN TO CONTINUE</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Color1,
  },
  text: {
    color: '#fff',
    fontSize: 50,
    marginTop: 10,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    height: height,
    paddingVertical: 35,
  },
  loginButton: {
    backgroundColor: Colors.Color5,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  loginText: {
    color: '#fff',
  },
});

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
  };
};

const mapDispatchToProps = {setAccessToken, setRefreshToken, setSigingIn};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
