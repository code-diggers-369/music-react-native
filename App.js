import React, {useEffect} from 'react';

// redux
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './app/redux/store';

// navigation
import MainNavigation from './app/navigation/mainNavigation';

// service
import TrackService from './app/service/setupPlayer';

const App = () => {
  useEffect(async () => {
    await TrackService();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
