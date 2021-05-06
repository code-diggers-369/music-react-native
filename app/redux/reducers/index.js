import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import authenticationSlice from './authenticationSlice';

//
import playback from './copy/playback';

const authenticationConfig = {
  key: 'authentication',
  storage: AsyncStorage,
  blacklist: ['accessToken'],
};
const playbackConfig = {
  key: 'playback',
  storage: AsyncStorage,
  blacklist: ['isPlaying'],
};

const rootReducer = combineReducers({
  authentication: persistReducer(authenticationConfig, authenticationSlice),
  // playback: persistReducer(playbackConfig, playback),
  playback: playback,
});

export default rootReducer;
