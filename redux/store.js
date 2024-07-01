import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import cartReducer from './cart';
import restaurantsReducer from './restaurants'
import userReducer from './user';
import addressReducer from "./address";

// Combine all the reducers
const rootReducer = combineReducers({
    cart: cartReducer,
    restaurants: restaurantsReducer,
    user: userReducer,
    address: addressReducer,
});

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
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
    },
  });

// Create the Redux store with the persisted reducer and customized middleware
export const store = configureStore({
    reducer: persistedReducer,
    middleware,
});

// Create the persistor to manage persistence
export const persistor = persistStore(store);

