import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_END_POINTS } from "../ApiEndPoints";
import axios from "axios";

export const fieldOfStudyAPI = createAsyncThunk(
  "fieldOfStudyAPI",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_END_POINTS.fieldOfStudy, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${credentials.token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(
          error.response.data.message || "Invalid credentials"
        );
      } else {
        return rejectWithValue("Something went wrong!");
      }
    }
  }
);

export const authSlice = createSlice({
  name: "globalFunc",
  reducers: {},
});

export default authSlice.reducer;
