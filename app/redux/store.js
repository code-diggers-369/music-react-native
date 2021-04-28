// import {createStore, compose, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
// import reducers from './reducers';

// export const store = createStore(reducers, compose(applyMiddleware(thunk)));

import {createStore} from 'redux';
import {persistStore} from 'redux-persist';

import rootReducer from './reducers/index';

const store = createStore(rootReducer);

let persistor = persistStore(store);

export {store, persistor};
