import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './fetchUserData';

//make the the data state more inofrmal for best access
const initialState = {
  data: {},
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // regular reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
