import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    deliveryAddress: {}
}

const addressSlice = createSlice({
    name: 'address',
    initialState: INITIAL_STATE,
    reducers: {
        selectAddress: (state, action) => {
            state.deliveryAddress = action.payload
        },
        resetAddress: (state) => {
            state.deliveryAddress = {}
        } 
    }
}); 

export const { selectAddress, resetAddress } = addressSlice.actions
export default addressSlice.reducer