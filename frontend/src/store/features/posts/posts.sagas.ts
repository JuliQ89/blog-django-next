import { put, call, takeLatest } from "redux-saga/effects";
import { axiosInstance } from "@/utils/axios";
import { postsActionTypes } from "./posts.action";
import {
  createCommentSuccess,
  createPostSuccess,
  deleteCommentSuccess,
  deletePostSuccess,
  getPostsSuccess,
  updateCommentSuccess,
  updatePostSuccess,
} from "./posts.slice";

// GET_POSTS
function* getPostsSaga() {
  try {
    const response: { data: {} } = yield call(axiosInstance.get, "/api/posts/");
    yield put(getPostsSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherGetPostsSaga() {
  yield takeLatest(postsActionTypes.GET_POSTS, getPostsSaga);
}

// CREATE_POST
function* createPostSaga(action: any) {
  try {
    const formData = new FormData();
    formData.append("image", action.payload.image);
    const payload = {
      heading: action.payload.heading,
      tags: action.payload.tags,
      content: action.payload.content,
    };
    formData.append("payload", JSON.stringify(payload));

    const response: { data: {} } = yield call(
      axiosInstance.post,
      "/api/posts/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    yield put(createPostSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherCreatePostSaga() {
  yield takeLatest(postsActionTypes.CREATE_POST, createPostSaga);
}

// DELETE_POST
function* deletePostSaga(action: any) {
  try {
    const response: { data: {} } = yield call(
      axiosInstance.delete,
      `/api/posts/${action.payload.id}/`,
      action.payload
    );
    console.log(response.data);
    yield put(deletePostSuccess(action.payload));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherDeletePostSaga() {
  yield takeLatest(postsActionTypes.DELETE_POST, deletePostSaga);
}

// UPDATE_POST_LIKED
function* updatePostLikedSaga(action: any) {
  try {
    const response: { data: {} } = yield call(
      axiosInstance.put,
      `/api/posts/liked/${action.payload.id}/`
    );
    yield put(updatePostSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherUpdatePostLikedSaga() {
  yield takeLatest(postsActionTypes.UPDATE_POST_LIKED, updatePostLikedSaga);
}

// UPDATE_POST_LIKED
function* updatePostAddedToReadingListSaga(action: any) {
  try {
    const response: { data: {} } = yield call(
      axiosInstance.put,
      `/api/posts/reading_list/${action.payload.id}/`
    );
    yield put(updatePostSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherUpdatePostAddedToReadingListSaga() {
  yield takeLatest(
    postsActionTypes.UPDATE_POST_ADDED_TO_READING_LIST,
    updatePostAddedToReadingListSaga
  );
}

// UPDATE_POST
function* updatePostSaga(action: any) {
  try {
    const formData = new FormData();
    formData.append("image", action.payload.image);

    const payload = {
      heading: action.payload.heading,
      content: action.payload.content,
      tags: action.payload.tags,
    };
    formData.append("payload", JSON.stringify(payload));

    const response: { data: {} } = yield call(
      axiosInstance.post,
      `/api/posts/${action.payload.post_id}/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    yield put(updatePostSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherUpdatePostSaga() {
  yield takeLatest(postsActionTypes.UPDATE_POST, updatePostSaga);
}

// CREATE_COMMENT
function* createCommentSaga(action: any) {
  try {
    const response: { data: {} } = yield call(
      axiosInstance.post,
      "/api/comments/",
      action.payload
    );
    console.log(response.data);
    yield put(createCommentSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherCreateCommentSagaSaga() {
  yield takeLatest(postsActionTypes.CREATE_COMMENT, createCommentSaga);
}

// DELETE_COMMENT
function* deleteCommentSaga(action: any) {
  try {
    const response: { data: { success: boolean } } = yield call(
      axiosInstance.delete,
      `/api/comments/${action.payload.comment_id}/`
    );
    const deleted = response.data.success;
    console.log(response.data);
    yield put(
      deleteCommentSuccess({
        comment_id: action.payload.comment_id,
        post_id: action.payload.post_id,
        success: deleted,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

export function* watcherDeleteCommentSaga() {
  yield takeLatest(postsActionTypes.DELETE_COMMENT, deleteCommentSaga);
}

// UPDATE_COMMENT
function* updateCommentSaga(action: any) {
  try {
    const response: { data: {} } = yield call(
      axiosInstance.put,
      `/api/comments/${action.payload.id}/`,
      { text: action.payload.text }
    );
    console.log(response.data);
    yield put(updateCommentSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherUpdateCommentSaga() {
  yield takeLatest(postsActionTypes.UPDATE_COMMENT, updateCommentSaga);
}
