export const postsActionTypes = {
  GET_POSTS: "GET_POSTS",
  CREATE_POST: "CREATE_POST",
  DELETE_POST: "DELETE_POST",
  UPDATE_POST: "UPDATE_POST",
  UPDATE_POST_LIKED: "UPDATE_POST_LIKED",
  CREATE_COMMENT: "CREATE_COMMENT",
  DELETE_COMMENT: "DELETE_COMMENT",
  UPDATE_COMMENT: "UPDATE_COMMENT",
};

export const getPosts = () => ({
  type: postsActionTypes.GET_POSTS,
});

export const createPost = (payload: {
  heading: string;
  image: File | null;
  tags: number[];
  content: string;
}) => ({
  type: postsActionTypes.CREATE_POST,
  payload,
});

export const deletePost = (payload: { id: string }) => ({
  type: postsActionTypes.DELETE_POST,
  payload,
});

export const updatePost = (payload: {
  heading: string;
  content: string;
  image: File | null;
  tags: number[];
  post_id: string;
}) => ({
  type: postsActionTypes.UPDATE_POST,
  payload,
});

export const updatePostLiked = (payload: { id: string }) => ({
  type: postsActionTypes.UPDATE_POST_LIKED,
  payload,
});

export const createComment = (payload: { text: string; post_id: string }) => ({
  type: postsActionTypes.CREATE_COMMENT,
  payload,
});

export const deleteComment = (payload: {
  comment_id: number;
  post_id: string;
}) => ({
  type: postsActionTypes.DELETE_COMMENT,
  payload,
});

export const updateComment = (payload: { id: number; text: string }) => ({
  type: postsActionTypes.UPDATE_COMMENT,
  payload,
});
