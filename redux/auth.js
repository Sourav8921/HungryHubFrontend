import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    isAuthenticated : false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        }
    }
})

export const { setIsAuthenticated } = authSlice.actions
export default authSlice.reducer