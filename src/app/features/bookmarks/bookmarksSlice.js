import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { handleLogin, handleSignup } from '../authentication/authSlice';
import {
  addComment,
  deleteComment,
  editPost,
  likeDislikePost,
} from '../posts/postsSlice';
import { getPostByID } from 'utilities';

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

export const removeFromBookmarks = createAsyncThunk(
  'bookmarks/removeFromBookmarks',
  async ({ postID, token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `/api/users/remove-bookmark/${postID}`,
        {},
        { headers: { authorization: token } }
      );
      if (status === 200) {
        return { bookmarks: data.bookmarks };
      }
    } catch (error) {
      return rejectWithValue({
        errorMessage: 'Failed in removing from bookmarks',
      });
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
    builder.addCase(handleSignup.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });

    builder.addCase(handleSignup.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.bookmarks = payload?.user?.bookmarks || [];
    });

    builder.addCase(handleSignup.rejected, (state) => {
      state.error = 'Failed in fetching bookmarked posts';
      state.status = 'failed';
    });

    // POST LIKE/DISLIKE CONSUME
    builder.addCase(likeDislikePost.fulfilled, (state, { payload }) => {
      const { posts, postID } = payload;
      const changedPost = getPostByID({ posts, postID });
      state.bookmarks[state.bookmarks.findIndex(({ _id }) => _id === postID)] =
        changedPost;
    });

    // POST EDIT CONSUME
    builder.addCase(editPost.fulfilled, (state, { payload }) => {
      const { posts, postID } = payload;
      const changedPost = getPostByID({ posts, postID });
      state.bookmarks[state.bookmarks.findIndex(({ _id }) => _id === postID)] =
        changedPost;
    });

    // POST COMMENT CONSUME
    builder.addCase(addComment.fulfilled, (state, { payload }) => {
      const { comments, postID } = payload;
      state.bookmarks = state.bookmarks.map((bookmark) =>
        bookmark._id === postID ? { ...bookmark, comments } : bookmark
      );
    });

    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      const { comments, postID } = payload;
      state.bookmarks = state.bookmarks.map((bookmark) =>
        bookmark._id === postID ? { ...bookmark, comments } : bookmark
      );
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

    // REMOVE FROM BOOKMARKS CASES
    builder.addCase(removeFromBookmarks.pending, (state) => {
      state.error = null;
    });

    builder.addCase(removeFromBookmarks.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.bookmarks = payload.bookmarks.reverse();
      state.error = null;
    });

    builder.addCase(removeFromBookmarks.rejected, (state, payload) => {
      state.error = payload.errorMessage;
      state.status = 'failed';
    });
  },
});

export const bookmarksReducer = bookmarksSlice.reducer;
