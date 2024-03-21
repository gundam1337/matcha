import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../API/axiosConfig';

export const fetchData = createAsyncThunk(
  'data/fetch',
  async () => {
    const response = await axiosInstance.get('/getUserData');
    return response.data;
  }
);