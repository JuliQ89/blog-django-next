import { put, call, takeLatest } from "redux-saga/effects";
import { axiosInstance } from "@/utils/axios";
import { tagsActionTypes } from "./tags.action";
import { getTagsSuccess } from "./tags.slice";

// GET_TAGS
function* getTagsSaga() {
  try {
    const response: { data: {} } = yield call(axiosInstance.get, "/api/tags/");
    yield put(getTagsSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherGetTagsSaga() {
  yield takeLatest(tagsActionTypes.GET_TAGS, getTagsSaga);
}
