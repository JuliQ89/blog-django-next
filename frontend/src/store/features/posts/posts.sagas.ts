import { put, call, takeLatest } from "redux-saga/effects";
import { axiosInstance } from "@/utils/axios";
import { postsActionTypes } from "./posts.action";
import {
  createPostSuccess,
  getPostsSuccess,
  updatePostLikedSuccess,
} from "./posts.slice";

// GET_POSTS
function* getPostsSaga() {
  try {
    const response: { data: {} } = yield call(axiosInstance.get, "/api/posts/");
    console.log(response.data);
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
    const response: { data: {} } = yield call(
      axiosInstance.post,
      "/api/posts/",
      action.payload
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

// UPDATE_POST_LIKED
function* updatePostLikedSaga(action: any) {
  try {
    const response: { data: {} } = yield call(
      axiosInstance.put,
      `/api/posts/${action.payload.id}/`
    );
    console.log(response.data);
    yield put(updatePostLikedSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherUpdatePostLikedSaga() {
  yield takeLatest(postsActionTypes.UPDATE_POST_LIKED, updatePostLikedSaga);
}
