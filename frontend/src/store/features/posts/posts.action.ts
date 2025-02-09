export const postsActionTypes = {
  GET_POSTS: "GET_POSTS",
  CREATE_POST: "CREATE_POST",
  UPDATE_POST_LIKED: "UPDATE_POST_LIKED",
};

export const getPosts = () => ({
  type: postsActionTypes.GET_POSTS,
});

export const createPost = (payload: {
  heading: string;
  tags: number[];
  content: string;
}) => ({
  type: postsActionTypes.CREATE_POST,
  payload,
});

export const updatePostLiked = (payload: { id: string }) => ({
  type: postsActionTypes.UPDATE_POST_LIKED,
  payload,
});
