import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../config";
import axios from "axios";

const INITIAL_STATE = {
    cartList: [],
    cartCount: 0,
    subTotal: 0,
    orderStatus: 'idle',
    orderError: null,
}

// Async thunk for submitting order
export const submitOrder = createAsyncThunk(
    'cart/submitOrder',
    async (orderDetails, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/restaurants/orders/`, orderDetails);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        addToCart: (state, action) => {
            const newRestaurantId = action.payload.restaurant;
            // Check if the cart is not empty and if the new item's restaurant is different
            if (state.cartList.length > 0 && state.cartList[0].restaurant !== newRestaurantId) {
                // Clear the cart if different restaurant
                state.cartList = [];
            }
            state.cartList.push({
                ...action.payload,
                count: 1,
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
            state.cartList = state.cartList.filter((item) => {
                if (item?.id === productID) {
                    if (item.count > 1) {
                        item.count--;
                        return true;
                    }
                    return false; // Remove item if count reaches 0
                }
                return true;
            });
        },
        findSubTotal: (state) => {
            state.subTotal = state.cartList.reduce((total, currValue) => (total += currValue.count * parseInt(currValue.price)), 0);
        },
        resetOrderStatus: (state) => {
            state.orderStatus = null;
            state.orderError = null;
        }, 
    },
    extraReducers: (builder) => {
        builder
            .addCase(submitOrder.pending, (state) => {
                state.orderStatus = 'loading';
                state.orderError = null;
            })
            .addCase(submitOrder.fulfilled, (state, action) => {
                state.orderStatus = 'succeeded';
                state.cartList = []; // Clear the cart after successful order submission
            })
            .addCase(submitOrder.rejected, (state, action) => {
                state.orderStatus = 'failed';
                state.orderError = action.payload;
            });
    }
});

export const { addToCart, decrement, increment, findSubTotal, resetOrderStatus } = cartSlice.actions
export default cartSlice.reducer;