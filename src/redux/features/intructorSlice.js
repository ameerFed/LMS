import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_END_POINTS } from "../ApiEndPoints";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  message: null,
};

export const instructorUpdateProfileAPI = createAsyncThunk(
  "instructorUpdateProfileAPI",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_END_POINTS.instructorProfileUpdate,
        credentials.payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${credentials.token}`,
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

export const instructorAddEducationAPI = createAsyncThunk(
  "instructorAddEducationAPI",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_END_POINTS.instructorAddEducation,
        credentials.payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${credentials.token}`,
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

export const instructorAddExperienceAPI = createAsyncThunk(
  "instructorAddExperienceAPI",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        API_END_POINTS.instructorAddExperience,
        credentials.payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${credentials.token}`,
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

export const skipClickAPI = createAsyncThunk(
  "skipClickAPI",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        API_END_POINTS.skipClick,
        { userId: credentials.auth.user_id,
          role: credentials.auth.role
         },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${credentials.auth.token}`,
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

const intructorSlice = createSlice({
  name: "intructor",
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

export default intructorSlice.reducer;
