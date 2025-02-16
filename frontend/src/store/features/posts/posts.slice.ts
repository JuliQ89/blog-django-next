import { PostI } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateI {
  posts: PostI[];
}

const initialState: initialStateI = {
  posts: [],
};

const updateObj = (
  list: { id: string | number }[],
  newObj: { id: string | number }
) => {
  const targetObjIndex = list.findIndex((obj) => obj.id === newObj.id);
  if (targetObjIndex !== -1) {
    list[targetObjIndex] = newObj;
  }
};

export const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    getPostsSuccess: (state, action) => {
      state.posts = action.payload;
    },
    createPostSuccess: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePostSuccess: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload.id);
    },
    updatePostLikedSuccess: (state, action) => {
      updateObj(state.posts, action.payload);
    },
    createCommentSuccess: (state, action) => {
      const post = state.posts.find(
        (post) => post.id == action.payload.post.id
      );
      if (post) {
        post.comments.push(action.payload);
      }
    },
    deleteCommentSuccess: (state, action) => {
      const postIndex = state.posts.findIndex(
        (post) => post.id === action.payload.post_id
      );
      state.posts[postIndex].comments = state.posts[postIndex].comments.filter(
        (comment) => comment.id !== action.payload.comment_id
      );
    },
  },
});

export const {
  getPostsSuccess,
  createPostSuccess,
  updatePostLikedSuccess,
  createCommentSuccess,
  deletePostSuccess,
  deleteCommentSuccess,
} = postsSlice.actions;

export default postsSlice.reducer;
