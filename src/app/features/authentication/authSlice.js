import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  userData: JSON.parse(localStorage.getItem('sharemoment-userData')) ?? {},
  status: 'idle',
  error: null,
};

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
        localStorage.setItem('sharemoment-userData', JSON.stringify(userData));
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
  },
});

export const selectUserData = (state) => state?.auth?.userData;
export const authReducer = authSlice.reducer;
