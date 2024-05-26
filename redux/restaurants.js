import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";


export const fetchRestaurants = createAsyncThunk("restaurants/fetchRestaurants", 
    async (_, { rejectWithValue })=>{
        try {
            const response = await axios.get(`${BASE_URL}/restaurants/restaurants/`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message); 
        }
})

const INITIAL_STATE = {
    loading: false,
    restaurants: [],
    error: null,
}

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurants.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurants = action.payload;
            })
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});


export default restaurantsSlice.reducer;