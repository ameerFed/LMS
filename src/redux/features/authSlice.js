import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_END_POINTS } from "../ApiEndPoints";
import axios from "axios";

const initialState = {
  isLoading: false,
  full_name: null,
  email: null,
  password: null,
  user_id: null,
  isError: false,
  message: null,
  role: null,
  profilePic: "",
  token: null,
};

export const loginAPI = createAsyncThunk(
  "loginAPI",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_END_POINTS.login, credentials, {
        headers: {
          "Content-Type": "application/json",
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

export const signupAPI = createAsyncThunk(
  "signupAPI",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_END_POINTS.signup, credentials, {
        headers: {
          "Content-Type": "application/json",
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

export const signupOTPVerify = createAsyncThunk(
  "signupOTPVerify",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_END_POINTS.signup, credentials, {
        headers: {
          "Content-Type": "application/json",
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

export const createOrganizationAPI = createAsyncThunk(
  "createOrganizationAPI",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_END_POINTS.organizationSubmit, credentials, {
        headers: {
          "Content-Type": "application/json",
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

export const signupConfirmationCodeAPI = createAsyncThunk(
  "signupConfirmationCodeAPI",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_END_POINTS.signupConfirmation, credentials, {
        headers: {
          "Content-Type": "application/json",
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

export const resendOTPAPI = createAsyncThunk(
  "resendOTPAPI",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_END_POINTS.resendOTP, credentials, {
        headers: {
          "Content-Type": "application/json",
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

export const emailForForgotPasswordAPI = createAsyncThunk(
  "emailForForgotPasswordAPI",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_END_POINTS.emailForgotPassword, credentials, {
        headers: {
          "Content-Type": "application/json",
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

export const resetPasswordAPI = createAsyncThunk(
  "resetPasswordAPI",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_END_POINTS.resetPassword, credentials, {
        headers: {
          "Content-Type": "application/json",
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
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login Handle Cases
    builder.addCase(loginAPI.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.token = action.payload?.data?.token;
      state.email = action.payload?.data?.user?.email;
      state.full_name = action.payload?.data?.user?.full_name;
      state.user_id =  action.payload?.data?.user?.id;
      state.role =  action.payload?.data?.user?.role?.name;
      state.password =  action.payload?.data?.user?.password;
      state.message = action.payload.message;
    });
    builder.addCase(loginAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload || "Something went wrong!";
    });

    // signup Handle Cases
    builder.addCase(signupAPI.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.email = action.payload?.data?.user?.email;
      state.full_name = action.payload?.data?.user?.full_name;
      state.user_id =  action.payload?.data?.user?.id;
      state.message = action.payload.message;
    });
    builder.addCase(signupAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload || "Something went wrong!";
    });

    // signupOTPVerify
    builder.addCase(signupOTPVerify.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupOTPVerify.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.token = action.payload?.data?.user?.token;
      state.email = action.payload?.data?.user?.email;
      state.username = action.payload?.data?.user?.username;
      state.password = action.payload.password;
      state.message = action.payload.message;
    });
    builder.addCase(signupOTPVerify.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload || "Something went wrong!";
    });

    // login Handle Cases
    builder.addCase(signupConfirmationCodeAPI.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signupConfirmationCodeAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.token = action.payload?.data?.token;
      state.email = action.payload?.data?.user?.email;
      state.role =  action.payload?.data?.user?.role?.name;
      state.username = action.payload?.data?.user?.username;
      state.password =  action.payload?.data?.user?.password;
      state.message = action.payload.message;
    });
    builder.addCase(signupConfirmationCodeAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload || "Something went wrong!";
    });

    // emailForForgotPasswordAPI
    builder.addCase(emailForForgotPasswordAPI.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(emailForForgotPasswordAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.email = action.payload?.data?.email;
    });
    builder.addCase(emailForForgotPasswordAPI.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload || "Something went wrong!";
    });
  },
});

export default authSlice.reducer;
