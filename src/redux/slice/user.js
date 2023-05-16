import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: [],
        pending: false,
        error: false,
    },
    reducers: {
        getListUserPending: (state, action) => {
            state.pending = true; 
            state.error = false;
        },
        getListUserSuccess: (state, action) => {
            state.pending = false; 
            state.error = false;
            state.data = action.payload.data 
        },
        getListUserError: (state, action) => {
            state.pending = true; 
            state.error = true;
        },
    }
})

export const { getListUserSuccess, getListUserError, getListUserPending } = userSlice.actions

export default userSlice.reducer 