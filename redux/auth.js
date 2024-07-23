import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    authToken: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload
        }
    }
})

export const { setAuthToken } = authSlice.actions
export default authSlice.reducer