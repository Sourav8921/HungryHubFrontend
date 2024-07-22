import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartReducer from './cart';
import restaurantsReducer from './restaurants'
import userReducer from './user';
import addressReducer from "./address";
import authReducer from "./auth";

// Combine all the reducers
const appReducer = combineReducers({
    cart: cartReducer,
    restaurants: restaurantsReducer,
    user: userReducer,
    address: addressReducer,
    auth: authReducer,
});

const rootReducer = (state, action) => {
  //if user logs out all reducers will be initialized a new
  if (action.type === 'USER_LOGOUT') {
    AsyncStorage.removeItem('persist:root') //also cleaning state in storage engine

    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

// Configuration for redux-persist
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the middleware to ignore non-serializable values for certain actions
const middleware = (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
    },
  });

// Create the Redux store with the persisted reducer and customized middleware
const store = configureStore({
    reducer: persistedReducer,
    middleware,
});

// Create the persistor to manage persistence
const persistor = persistStore(store);

export { store, persistor };
