import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";
import postsReducer from "./features/posts/posts.slice";
import tagsReducer from "./features/tags/tags.slice";
import usersReducer from "./features/users/users.slice";

export const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  tags: tagsReducer,
  users: usersReducer,
});
