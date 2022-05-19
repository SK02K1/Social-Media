import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleLogin } from '../authentication/authSlice';

export const getAllBookmarks = createAsyncThunk(
  'bookmarks/getAllBookmarks',
  async ({ token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.get('/api/users/bookmark/', {
        headers: { authorization: token },
      });
      if (status === 200) {
        return { bookmarks: data.bookmarks };
      }
    } catch (error) {
      return rejectWithValue({ errorMessage: 'Failed to fetch bookmarks' });
    }
  }
);

export const addToBookmarks = createAsyncThunk(
  'bookmarks/addToBookmarks',
  async ({ token, postID }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `/api/users/bookmark/${postID}`,
        {},
        { headers: { authorization: token } }
      );
      if (status === 200) {
        return { bookmarks: data.bookmarks };
      }
    } catch (error) {
      return rejectWithValue({ errorMessage: 'Failed to bookmark the post' });
    }
  }
);

const initialState = {
  bookmarks: null,
  status: 'idle',
  error: null,
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // INIT BOOKMARKS ON USER ONBOARD
    builder.addCase(handleLogin.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(handleLogin.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.bookmarks = payload?.user?.bookmarks || [];
    });

    builder.addCase(handleLogin.rejected, (state) => {
      state.error = 'Failed in fetching bookmarked posts';
      state.status = 'failed';
    });

    // GET BOOKMARKS CASES
    builder.addCase(getAllBookmarks.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(getAllBookmarks.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.bookmarks = payload.bookmarks;
      state.error = null;
    });

    builder.addCase(getAllBookmarks.rejected, (state) => {
      state.error = 'Failed in fetching bookmarked posts';
      state.status = 'failed';
    });

    // ADD TO BOOKMARKS CASES
    builder.addCase(addToBookmarks.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(addToBookmarks.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.bookmarks = payload.bookmarks.reverse();
      state.error = null;
    });

    builder.addCase(addToBookmarks.rejected, (state, payload) => {
      state.error = payload.errorMessage;
      state.status = 'failed';
    });
  },
});

export const bookmarksReducer = bookmarksSlice.reducer;
