import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";
import postsReducer from "./features/posts/posts.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});
