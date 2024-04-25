import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./fetchUserData";
import fetchUserData from "./fetchingUserSearch";

const SearchUserSlice = createSlice({
  name: "searchUser", // Name of the slice
  initialState: {
    userData: null,
    status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading"; // Indicate loading state
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded"; // Indicate successful fetch
        state.userData = action.payload; // Store fetched user data
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed"; // Indicate failed fetch
        state.error = action.payload; // Store error message
      });
  },
});


export const { resetUserData } = SearchUserSlice.actions; // Exporting the actions
export default SearchUserSlice.reducer; // Exporting the reducer