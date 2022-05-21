import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const saveUserDataInLocalStorage = (userData) => {
  localStorage.setItem('sharemoment-userData', JSON.stringify(userData));
};

const getUserDataFromLocalStorage = () =>
  JSON.parse(localStorage.getItem('sharemoment-userData'));

const removeUserDataFromLocalStorage = () =>
  localStorage.removeItem('sharemoment-userData');

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

export const editUserData = createAsyncThunk(
  'auth/editUserData',
  async ({ userData, token }) => {
    try {
      const { data, status } = await axios.post(
        '/api/users/edit',
        { userData },
        { headers: { authorization: token } }
      );
      if (status === 201) {
        saveUserDataInLocalStorage(data.user);
        return { user: data.user };
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const followUser = createAsyncThunk(
  'auth/followUser',
  async ({ userID, token }) => {
    try {
      const { data, status } = await axios.post(
        `/api/users/follow/${userID}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (status === 200) {
        saveUserDataInLocalStorage(data.user);
        return { user: data.user };
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'auth/unfollowUser',
  async ({ userID, token }) => {
    try {
      const { data, status } = await axios.post(
        `/api/users/unfollow/${userID}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (status === 200) {
        saveUserDataInLocalStorage(data.user);
        return { user: data.user };
      }
    } catch (error) {
      console.log(error);
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

    // Edit User Data Cases
    builder.addCase(editUserData.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(editUserData.fulfilled, (state, { payload }) => {
      state.status = 'succeed';
      state.error = null;
      state.userData.user = payload.user;
    });

    builder.addCase(editUserData.rejected, (state, { payload }) => {
      state.status = 'failed';
      state.error = 'Failed to update your profile';
    });

    // Follow User Cases
    builder.addCase(followUser.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(followUser.fulfilled, (state, { payload }) => {
      state.status = 'succeed';
      state.error = null;
      state.userData.user = payload.user;
    });

    builder.addCase(followUser.rejected, (state, { payload }) => {
      state.status = 'failed';
      state.error = 'Failed to update your profile';
    });

    // Unfollow User Cases
    builder.addCase(unfollowUser.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(unfollowUser.fulfilled, (state, { payload }) => {
      state.status = 'succeed';
      state.error = null;
      state.userData.user = payload.user;
    });

    builder.addCase(unfollowUser.rejected, (state, { payload }) => {
      state.status = 'failed';
      state.error = 'Failed to update your profile';
    });
  },
});

export const selectUserData = (state) => state?.auth?.userData;
export const { handleLogout, resetErrorMessage } = authSlice.actions;
export const authReducer = authSlice.reducer;
