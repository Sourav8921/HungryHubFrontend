import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
    authToken: null,
    isAuth: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
    reducers: {
        setAuthToken: (state, action) => {
            state.authToken = action.payload
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        }
    }
})

export const { setAuthToken, setIsAuth } = authSlice.actions
export default authSlice.reducer