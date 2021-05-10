import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// redux
import {connect} from 'react-redux';
import {
  setAccessToken,
  setRefreshToken,
} from '../../redux/reducers/authenticationSlice';

//
import spotify from '../../auth/Spotify';
import {getProfileData} from '../../utils/fetchData/fetchProfiledata';

//
import Color from '../../utils/colors';

//
const {height, width} = Dimensions.get('screen');

function Profile(props) {
  const [userData, setUserData] = useState({name: ''});

  useEffect(async () => {
    try {
      const data = await getProfileData();

      setUserData({name: data.display_name});

      return () => {};
    } catch (err) {
      console.log(err);
    }
  }, []);

  const logout = async () => {
    try {
      await spotify.resetCredentials();

      await props.setAccessToken('');
      await props.setRefreshToken('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0.45, 0.9]}
        colors={['rgba(125,75,50,0.3)', 'rgba(73, 60, 77, 0.2)']}
        style={styles.linearGradient}>
        <View style={styles.topContainer}>
          <View style={styles.roundView}>
            <Text style={styles.roundViewInnerText}>
              {userData.name.substr(0, 1)}
            </Text>
          </View>

          <Text style={styles.name}>{userData.name}</Text>
        </View>
      </LinearGradient>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.logout} onPress={() => logout()}>
          <Text style={{color: '#fff'}}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Made With ♥ In India</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.Color1,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'rgba(73, 60, 77, 0.2)',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linearGradient: {
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundView: {
    height: 120,
    width: 120,
    backgroundColor: 'rgba(125,75,50,255)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundViewInnerText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#fff',
  },
  topContainer: {
    alignItems: 'center',
  },
  name: {
    marginVertical: 10,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  logout: {
    // marginBottom: 50,
    // backgroundColor: Color.Color5,
    alignItems: 'center',
    backgroundColor: Color.Color5,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 10,
    width: width - 30,
  },
  footer: {
    marginBottom: 20,
    color: '#fff',
  },
});

const mapStateToProps = state => {
  return {
    accessToken: state.authentication.accessToken,
  };
};

const mapDispatchToProps = {
  setAccessToken,
  setRefreshToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
