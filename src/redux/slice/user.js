import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchListUser, fetchUserById } from "../../services/auth";


//action
export const getListUser = createAsyncThunk('fetchListUser', async () => {
    const res = await fetchListUser()
    return res
})

export const getUserBuyId = createAsyncThunk('fetchListUser', async (userId) => {
    const res = await fetchUserById(userId)
    return res
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(getListUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getListUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })
        builder.addCase(getListUser.rejected, (state, action) => {
            console.log('Error', action.payload)
            state.isError = true
        })
    }
})

export default userSlice.reducer 