import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import rootReducer from './rootReducer';
//import { setupListeners } from '@reduxjs/toolkit/dist/query';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	devTools: true,
});
//setupListeners(store.dispatch);
export default store;