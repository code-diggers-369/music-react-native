import React, {useEffect} from 'react';
// redux
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './app/redux/store';
// import audio player setup
import SetUpPlayer from './app/service/setupPlayer';
import TrackPlayer from 'react-native-track-player';
// navigation
import MainNavigation from './app/navigation/mainNavigation';

const App = () => {
  useEffect(async () => {
    await SetUpPlayer();
  }, []);

  console.log(persistor.subscribe(() => console.log('changed')));

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
