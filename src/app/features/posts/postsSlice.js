import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async (_, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.get('/api/posts');
      if (status === 200) {
        return data;
      }
    } catch (error) {
      return rejectWithValue({ errorMessage: 'Failed in fetching posts' });
    }
  }
);

export const createNewPost = createAsyncThunk(
  'posts/createNewPost',
  async ({ token, postData }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        '/api/posts',
        { postData },
        { headers: { authorization: token } }
      );
      if (status === 201) {
        return { post: data.posts[data.posts.length - 1] };
      }
    } catch (error) {
      return rejectWithValue({ errorMessage: 'Failed in posting your moment' });
    }
  }
);

const initialState = {
  posts: null,
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Get Posts Cases
    builder.addCase(getAllPosts.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(getAllPosts.fulfilled, (state, { payload }) => {
      state.posts = payload.posts;
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(getAllPosts.rejected, (state, { payload }) => {
      state.error = payload.errorMessage;
      state.status = 'failed';
    });

    // Create Post Cases
    builder.addCase(createNewPost.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(createNewPost.fulfilled, (state, { payload }) => {
      state.posts.unshift(payload.post);
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(createNewPost.rejected, (state, { payload }) => {
      state.error = payload.errorMessage;
      state.status = 'failed';
    });
  },
});

export const postsReducer = postsSlice.reducer;
