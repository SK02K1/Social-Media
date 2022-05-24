import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './features/authentication/authSlice';
import { bookmarksReducer } from './features/bookmarks/bookmarksSlice';
import { postsReducer } from './features/posts/postsSlice';
import { userReducer } from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    bookmarks: bookmarksReducer,
    user: userReducer,
  },
});
