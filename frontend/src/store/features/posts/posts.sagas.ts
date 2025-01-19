import { put, call, takeLatest } from "redux-saga/effects";
import { axiosInstance } from "@/utils/axios";
import { postsActionTypes } from "./posts.action";
import { getPostsSuccess } from "./posts.slice";

// GET_POSTS
function* getPostsSaga() {
  try {
    const response: { data: {} } = yield call(axiosInstance.get, "/api/posts");
    console.log(response.data);
    yield put(getPostsSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherGetPostsSaga() {
  yield takeLatest(postsActionTypes.GET_POSTS, getPostsSaga);
}
