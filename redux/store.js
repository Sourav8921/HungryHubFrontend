import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart';
import restaurantsReducer from './restaurants'


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        restaurants: restaurantsReducer,
    }
})