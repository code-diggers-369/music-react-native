import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';

//
import AuthenticationHandler from '../auth/AuthenticationHandler';

//
import {
  setAccessToken,
  setRefreshToken,
  setSigingIn,
} from '../auth/authenticationSlice';
// import authHandler from '../../utils/authenticationHandler';

// export default function Login() {
//   const authHandler = new AuthenticationHandler();

//   return (
//     <View>
//       <Button onPress={() => authHandler.onLogin()} title="Press to login" />
//     </View>
//   );
// }

class LoginScreen extends Component {
  state = {};

  onPressLogin = async () => {
    const authHandler = new AuthenticationHandler();

    const authenticationObject = await authHandler.onLogin();
    this.props.setAccessToken({accessToken: authenticationObject.accessToken});
    this.props.setRefreshToken({
      refreshToken: authenticationObject.refreshToken,
    });

    console.log('done');
  };

  render() {
    return (
      <View>
        <Button onPress={this.onPressLogin} title="Press to login" />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    authentication: state.authentication,
  };
};

const mapDispatchToProps = {setAccessToken, setRefreshToken, setSigingIn};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
