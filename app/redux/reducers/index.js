// import {combineReducers} from 'redux';

// // import reducers
// import music from './music';

// export default combineReducers({
//   music,
// });

import {combineReducers} from 'redux';

import authenticationSlice from '../../auth/authenticationSlice';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const authenticationConfig = {
  key: 'authentication',
  storage: AsyncStorage,
  // blacklist: ['accessToken'],
};

const rootReducer = combineReducers({
  authentication: persistReducer(authenticationConfig, authenticationSlice),
});

export default rootReducer;
