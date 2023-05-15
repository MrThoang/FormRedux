import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        pending: false,
        error: false,
    },
    reducers: {
        getListUserSuccess: (state, action) => {
            state.pending =false;
            state.error = false;
            state.data = action.payload 
        },

        getUserBuyIdSuccess: (state, action) => {
            state.pending =false;
            state.error = false;
            state.data = action.payload
        }
    }
})

export const { getListUserSuccess, getUserBuyIdSuccess } = userSlice.actions

export default userSlice.reducer 