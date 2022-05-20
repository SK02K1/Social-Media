import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './features/authentication/authSlice';
import { bookmarksReducer } from './features/bookmarks/bookmarksSlice';
import { postsReducer } from './features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    bookmarks: bookmarksReducer,
  },
});
