import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';
import setAuthToken from '../utils/setAuthToken';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store = createStore(persistedReducer, applyMiddleware(thunk));

let currentState = store.getState();
store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export default store;
