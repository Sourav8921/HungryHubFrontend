import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    cartList: [],
    cartCount: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        addToCart: (state, action) => {
            const itemExists = state.cartList.find((item) => item.id === action.payload.id)
            if (itemExists) {
                state.cartList.forEach((item) => {
                    if (item?.id === action.payload.id) {
                        item.count = 1;
                    } 
                });
                return;
            }
            state.cartList.push({
                ...action.payload,
                count: 1
            });
        },
        increment: (state, action) => {
            const productID = action.payload;
            state.cartList.forEach((item) => {
                if (item?.id === productID) {
                    item.count++;
                }
            })
        },
        decrement: (state, action) => {
            const productID = action.payload;
            state.cartList.forEach((item) => {
                if (item?.id === productID) {
                    item.count--;
                }
            })
        }
    }
})

export const { addToCart, decrement, increment } = cartSlice.actions
export default cartSlice.reducer;