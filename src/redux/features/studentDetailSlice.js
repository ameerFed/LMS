import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_END_POINTS } from "../ApiEndPoints";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  message: null
};

export const studentAddEducationAPI = createAsyncThunk(
  "studentAddEducationAPI",
  async (credentials ,{ rejectWithValue }) => {
    console.log(credentials)
    try {
      const response = await axios.post(
        API_END_POINTS.studentAddEducation,
        credentials.payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${credentials.token}`
          },
        }
      );

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

export const studentAddExperienceAPI = createAsyncThunk(
  "studentAddExperienceAPI",
  async (credentials ,{ rejectWithValue }) => {
    console.log(credentials)
    try {
      const response = await axios.post(
        API_END_POINTS.studentAddExperience,
        credentials.payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${credentials.token}`
          },
        }
      );

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

const studentDetailSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   // function
  //  builder.addCase(loginAPI.pending, (state) => {
  //     state.isLoading = true;
  //   });
  //   builder.addCase(loginAPI.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.isError = false;
  //     state.message = action.payload.message;
  //   });
  //   builder.addCase(loginAPI.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.isError = true;
  //     state.message = action.payload || "Something went wrong!";
  //   });
  // },
});

export default studentDetailSlice.reducer;
