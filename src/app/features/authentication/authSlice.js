import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  saveUserDataInLocalStorage,
  getUserDataFromLocalStorage,
  removeUserDataFromLocalStorage,
} from 'utilities';

export const handleLogin = createAsyncThunk(
  'auth/handleLogin',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post('/api/auth/login', {
        username,
        password,
      });
      if (status === 200) {
        const userData = {
          token: data?.encodedToken,
          user: data?.foundUser,
        };
        saveUserDataInLocalStorage(userData);
        return userData;
      }
    } catch (error) {
      const { status, message } = error.response;
      let errorMessage;
      if (status === 401) {
        errorMessage = 'Wrong Credentials';
      } else if (status === 404) {
        errorMessage = 'User not found';
      } else {
        errorMessage = message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const handleSignup = createAsyncThunk(
  'auth/handleSignup',
  async (formData, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post('/api/auth/signup', {
        ...formData,
      });
      if (status === 201) {
        const userData = {
          token: data?.encodedToken,
          user: data?.createdUser,
        };
        saveUserDataInLocalStorage(userData);
        return userData;
      }
    } catch (error) {
      const { status, message } = error.response;
      if (status === 422) {
        return rejectWithValue('Username already in use');
      }
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  userData: getUserDataFromLocalStorage() ?? {},
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLogout: (state) => {
      removeUserDataFromLocalStorage();
      state.userData = {};
    },
    resetErrorMessage: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    // Login Cases
    builder.addCase(handleLogin.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(handleLogin.fulfilled, (state, { payload }) => {
      state.status = 'succeed';
      state.error = null;
      state.userData = payload;
    });

    builder.addCase(handleLogin.rejected, (state, { payload }) => {
      state.status = 'failed';
      state.error = payload;
    });

    // Signup Cases
    builder.addCase(handleSignup.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(handleSignup.fulfilled, (state, { payload }) => {
      state.status = 'succeed';
      state.error = null;
      state.userData = payload;
    });

    builder.addCase(handleSignup.rejected, (state, { payload }) => {
      state.status = 'failed';
      state.error = payload;
    });
  },
});

export const selectUserData = (state) => state?.auth?.userData;
export const { handleLogout, resetErrorMessage } = authSlice.actions;
export const authReducer = authSlice.reducer;
