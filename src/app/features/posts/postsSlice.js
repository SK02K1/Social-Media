import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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
        return { posts: data.posts, message: 'Posted successfully' };
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue({ message: 'Failed in posting your moment' });
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async ({ postID, token }, { rejectWithValue }) => {
    try {
      const { status } = await axios.delete(`/api/posts/${postID}`, {
        headers: { authorization: token },
      });
      if (status === 201) {
        return { postID };
      }
    } catch (error) {
      return rejectWithValue({ errorMessage: 'Failed in deleting the post' });
    }
  }
);

export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ postData, token }, { rejectWithValue }) => {
    const { _id: postID } = postData;
    try {
      const { data, status } = await axios.post(
        `/api/posts/edit/${postID}`,
        { postData },
        { headers: { authorization: token } }
      );
      if (status === 201) {
        return { editedPost: data.posts.find(({ _id }) => _id === postID) };
      }
    } catch (error) {
      return rejectWithValue({ errorMessage: 'Failed in editing the post' });
    }
  }
);

export const likeDislikePost = createAsyncThunk(
  'posts/likeDislikePost',
  async ({ postID, action, token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `/api/posts/${action}/${postID}`,
        {},
        {
          headers: { authorization: token },
        }
      );
      if (status === 201) {
        return {
          likesData: data.posts.find(({ _id }) => _id === postID).likes,
          postID,
        };
      }
    } catch (error) {
      return rejectWithValue({ errorMessage: `Failed to ${action}` });
    }
  }
);

export const addComment = createAsyncThunk(
  'posts/addComment',
  async ({ postID, token, commentData }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `/api/comments/add/${postID}`,
        { commentData },
        {
          headers: { authorization: token },
        }
      );
      if (status === 201) {
        return { comments: data.comments, postID };
      }
    } catch (error) {
      return rejectWithValue({ errorMessage: 'Failed in adding comment' });
    }
  }
);

export const deleteComment = createAsyncThunk(
  'posts/deleteComment',
  async ({ postID, commentID, token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `/api/comments/delete/${postID}/${commentID}`,
        {},
        { headers: { authorization: token } }
      );
      if (status === 201) {
        return { comments: data.comments, postID };
      }
    } catch (error) {
      return rejectWithValue({
        errorMessage: 'Failed in deleting the comment',
      });
    }
  }
);

export const editComment = createAsyncThunk(
  'posts/editComment',
  async ({ commentData, postID, commentID, token }, { rejectWithValue }) => {
    try {
      const { data, status } = await axios.post(
        `/api/comments/edit/${postID}/${commentID}`,
        { commentData },
        { headers: { authorization: token } }
      );
      if (status === 201) {
        return { comments: data.comments, postID };
      }
    } catch (error) {
      return rejectWithValue({ errorMessage: 'Failed in editing comment' });
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
      state.error = null;
    });
    builder.addCase(createNewPost.fulfilled, (state, { payload }) => {
      state.posts = payload.posts;
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(createNewPost.rejected, (state, { payload }) => {
      state.status = 'failed';
    });

    // Delete Post Cases
    builder.addCase(deletePost.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      state.posts = state.posts.filter(({ _id }) => _id !== payload.postID);
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(deletePost.rejected, (state, { payload }) => {
      state.error = payload.errorMessage;
      state.status = 'failed';
    });

    // Edit Post Cases
    builder.addCase(editPost.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(editPost.fulfilled, (state, { payload }) => {
      state.posts.find(({ _id }) => _id === payload.editedPost._id).content =
        payload.editedPost.content;
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(editPost.rejected, (state, { payload }) => {
      state.error = payload.errorMessage;
      state.status = 'failed';
    });

    // Like/Dislike Post Cases
    builder.addCase(likeDislikePost.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(likeDislikePost.fulfilled, (state, { payload }) => {
      state.posts.find(({ _id }) => _id === payload.postID).likes =
        payload.likesData;
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(likeDislikePost.rejected, (state, { payload }) => {
      state.error = payload.errorMessage;
      state.status = 'failed';
    });

    // Add Comment Cases
    builder.addCase(addComment.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(addComment.fulfilled, (state, { payload }) => {
      state.posts.find(({ _id }) => _id === payload.postID).comments =
        payload.comments.reverse();
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(addComment.rejected, (state, { payload }) => {
      state.error = payload.errorMessage;
      state.status = 'failed';
    });

    // Delete Comment Cases
    builder.addCase(deleteComment.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      state.posts.find(({ _id }) => _id === payload.postID).comments =
        payload.comments.reverse();
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(deleteComment.rejected, (state, { payload }) => {
      state.error = payload.errorMessage;
      state.status = 'failed';
    });

    // Edit Comment Cases
    builder.addCase(editComment.pending, (state) => {
      state.status = 'pending';
      state.error = null;
    });
    builder.addCase(editComment.fulfilled, (state, { payload }) => {
      state.posts.find(({ _id }) => _id === payload.postID).comments =
        payload.comments.reverse();
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(editComment.rejected, (state, { payload }) => {
      state.error = payload.errorMessage;
      state.status = 'failed';
    });
  },
});

export const postsReducer = postsSlice.reducer;
