import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    cartList: [],
    cartCount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        addToCart: (state, action)=> {
            state.cartList.push({
                ...action.payload,
                count: 1
            });
        },
        increment: (state)=> {
            state.cartCount += 1;
        },
        decrement: (state)=> {
            state.cartCount -= 1;
        }
    }
})

export const {addToCart, decrement, increment} = cartSlice.actions
export default cartSlice.reducer;