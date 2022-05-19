import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './features/authentication/authSlice';
import { postsReducer } from './features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});
