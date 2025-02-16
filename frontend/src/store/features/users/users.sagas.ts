import { put, call, takeLatest } from "redux-saga/effects";
import { axiosInstance } from "@/utils/axios";
import { usersActionTypes } from "./users.action";
import { getUsersSuccess } from "./users.slice";

// GET_USERS
function* getUsersSaga() {
  try {
    const response: { data: {} } = yield call(
      axiosInstance.get,
      "/api/auth/users/"
    );
    yield put(getUsersSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherGetUsersSaga() {
  yield takeLatest(usersActionTypes.GET_USERS, getUsersSaga);
}
