import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllUsers = createAsyncThunk(
    'user/fetchAllUsers',
    async () => {
        const response = await axios.get("http://localhost:8080/users/all")
        return response.data
    }
)

const initialState = {
  listUser: [],
  isLoading: false,
  isError: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllUsers.pending, (state, action) => {
        state.isLoading = true,
        state.isError = false
    })
    .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.isLoading = false,
        state.isError = false,
        state.listUser = action.payload
    })
    .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false,
        state.isError = true
    })
  }
})


export default userSlice.reducer