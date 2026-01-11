import {
  createStore,
  applyMiddleware,
  combineReducers,
  AnyAction,
} from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import placesReducer from './places/places.reducer';
import { fetchPlacesEpic } from './places/places.epic';

const rootReducer = combineReducers({
  places: placesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const placesPersistConfig = {
  key: `places`,
  storage: AsyncStorage,
  whitelist: [`visitedIds`],
};

const persistedReducer = combineReducers({
  places: persistReducer(placesPersistConfig, placesReducer),
});

const rootEpic = combineEpics<AnyAction, AnyAction, RootState>(fetchPlacesEpic);

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

const store = createStore(persistedReducer, applyMiddleware(epicMiddleware));

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

epicMiddleware.run(rootEpic);

export default store;
