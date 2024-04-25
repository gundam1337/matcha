import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../API/axiosConfig";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/getUserData/${username}`);
      if (!response.ok) {
        throw new Error("User not found");
      }
      const data = await response.json();
      return data; // Return the fetched user data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default fetchUserData;