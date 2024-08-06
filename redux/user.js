import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUser = createAsyncThunk('user/fetchUser',
    async ( _, { rejectWithValue }) => {
        try {
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.get(`${BASE_URL}/api/users/profile/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const INITIAL_STATE = {
    user: {},
}

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = action.payload;
            })
    },
})


export default userSlice.reducer;