import { PostI } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateI {
  posts: PostI[];
}

const initialState: initialStateI = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { getPostsSuccess } = postsSlice.actions;

export default postsSlice.reducer;
