import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: JSON.parse(localStorage.getItem('sharemoment-userData')) ?? {},
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export const selectUserData = (state) => state?.auth?.userData;
export const authReducer = authSlice.reducer;