import { PostI } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateI {
  searchValue: string;
  posts: PostI[];
  filteredPosts: PostI[];
}

const initialState: initialStateI = {
  searchValue: "",
  posts: [],
  filteredPosts: [],
};

const optimizeSearchValue = (value: string) => {
  return value.toLowerCase().trim();
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
      state.filteredPosts = action.payload;
    },
    searchPosts: (state, action) => {
      state.searchValue = action.payload;

      const searchValue = optimizeSearchValue(state.searchValue);
      state.filteredPosts = state.posts.filter(
        (post: PostI) =>
          optimizeSearchValue(post.heading).includes(searchValue) ||
          post.tag.some((obj) =>
            optimizeSearchValue(obj.name).includes(searchValue)
          ) ||
          optimizeSearchValue(post.user.username).includes(searchValue)
      );
    },
    createPostSuccess: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePostLikedSuccess: (state, action) => {
      updateObj(state.filteredPosts, action.payload);
      updateObj(state.posts, action.payload);
    },
  },
});

export const {
  getPostsSuccess,
  searchPosts,
  createPostSuccess,
  updatePostLikedSuccess,
} = postsSlice.actions;

export default postsSlice.reducer;
