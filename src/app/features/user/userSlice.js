import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  getUserDataFromLocalStorage,
  saveUserDataInLocalStorage,
} from 'utilities';
import { handleLogin, handleSignup } from '../authentication/authSlice';

export const getUser = createAsyncThunk(
  'user/getUser',
  async ({ username }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.get(`/api/users/${username}`);
      if (status === 200) {
        return { user: data?.user };
      }
    } catch (error) {
      return rejectWithValue({ errorMessage: 'Failed to fetch user profile' });
    }
  }
);

export const getUserPosts = createAsyncThunk(
  'user/getUserPosts',
  async ({ username }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.get(`/api/posts/user/${username}`);
      if (status === 200) {
        return { posts: data?.posts };
      }
    } catch (error) {
      rejectWithValue({ errorMessage: "Failed to fetch user's posts" });
    }
  }
);

export const editUser = createAsyncThunk(
  'user/editUser',
  async ({ userData, token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        '/api/users/edit',
        { userData },
        { headers: { authorization: token } }
      );
      if (status === 201) {
        saveUserDataInLocalStorage({ user: data.user, token });
        return { user: data.user, message: 'Profile updated successfully' };
      }
    } catch (error) {
      return rejectWithValue({ message: 'Failed to update your profile' });
    }
  }
);
export const followUser = createAsyncThunk(
  'auth/followUser',
  async ({ userID, token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `/api/users/follow/${userID}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (status === 200) {
        saveUserDataInLocalStorage({ user: data.user, token });
        return { user: data.user, message: 'Successfully Followed' };
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue({ message: 'Failed to follow user' });
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'auth/unfollowUser',
  async ({ userID, token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `/api/users/unfollow/${userID}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (status === 200) {
        saveUserDataInLocalStorage({ user: data.user, token });
        return { user: data.user, message: 'Unfollowed Successfully' };
      }
    } catch (error) {
      return rejectWithValue({ message: 'Failed to unfollow user' });
    }
  }
);

const initialState = {
  user: getUserDataFromLocalStorage()?.user || {},
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // CONSUME USER FROM AUTH ACTIONS
    builder.addCase(handleLogin.fulfilled, (state, { payload }) => {
      state.user = payload?.user;
    });
    builder.addCase(handleSignup.fulfilled, (state, { payload }) => {
      state.user = payload?.user;
    });

    // GET USER CASES
    builder.addCase(getUser.pending, (state) => {
      state.error = null;
      state.status = 'pending';
    });
    builder.addCase(getUser.fulfilled, (state) => {
      state.error = null;
      state.status = 'succeeded';
    });
    builder.addCase(getUser.rejected, (state, { payload }) => {
      state.error = payload.errorMessage;
      state.status = 'failed';
    });

    // GET USER POSTS
    builder.addCase(getUserPosts.pending, (state) => {
      state.error = null;
      state.status = 'pending';
    });
    builder.addCase(getUserPosts.fulfilled, (state) => {
      state.error = null;
      state.status = 'succeeded';
    });
    builder.addCase(getUserPosts.rejected, (state, { payload }) => {
      state.error = payload.errorMessage;
      state.status = 'failed';
    });

    // EDIT USER CASES
    builder.addCase(editUser.pending, (state) => {
      state.error = null;
    });
    builder.addCase(editUser.fulfilled, (state, { payload }) => {
      state.error = null;
      state.user = payload.user;
      state.status = 'succeeded';
    });
    builder.addCase(editUser.rejected, (state, { payload }) => {
      state.status = 'failed';
    });

    // FOLLOW USER CASES
    builder.addCase(followUser.pending, (state) => {
      state.error = null;
    });

    builder.addCase(followUser.fulfilled, (state, { payload }) => {
      state.status = 'succeed';
      state.error = null;
      state.user = payload.user;
    });

    builder.addCase(followUser.rejected, (state, { payload }) => {
      state.status = 'failed';
    });

    // UNFOLLOW USER CASES
    builder.addCase(unfollowUser.pending, (state) => {
      state.error = null;
    });

    builder.addCase(unfollowUser.fulfilled, (state, { payload }) => {
      state.status = 'succeed';
      state.error = null;
      state.user = payload.user;
    });

    builder.addCase(unfollowUser.rejected, (state, { payload }) => {
      state.status = 'failed';
    });
  },
});

export const userReducer = userSlice.reducer;
