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
  },
});

export const {
  getPostsSuccess,
  createPostSuccess,
  updatePostLikedSuccess,
  createCommentSuccess,
  deletePostSuccess,
} = postsSlice.actions;

export default postsSlice.reducer;
