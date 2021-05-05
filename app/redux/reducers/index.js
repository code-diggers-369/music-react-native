import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import authenticationSlice from './authenticationSlice';
import songSlice from './song';

//
import data from './copy/data';
import playback from './copy/playback';

const authenticationConfig = {
  key: 'authentication',
  storage: AsyncStorage,
  blacklist: ['accessToken'],
};

const rootReducer = combineReducers({
  authentication: persistReducer(authenticationConfig, authenticationSlice),
  song: songSlice,
  data,
  playback,
});

export default rootReducer;
