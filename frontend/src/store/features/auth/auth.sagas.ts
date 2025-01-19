import { put, call, takeLatest } from "redux-saga/effects";
import { axiosInstance } from "@/utils/axios";
import { loginSuccess, logoutSuccess } from "./auth.slice";
import Cookies from "js-cookie";
import { ActionType } from "@/utils/types";
import { authActionTypes } from "./auth.action";

// LOGIN
function* loginSaga(action: ActionType) {
  try {
    const tokens: {
      data: {
        access_token: string;
        refresh_token: string;
      };
    } = yield call(axiosInstance.post, "/api/auth/obtain", action.payload);
    Cookies.set("access_token", tokens.data.access_token);
    Cookies.set("refresh_token", tokens.data.refresh_token);
    yield put(loginSuccess(tokens.data.access_token));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherLoginSaga() {
  yield takeLatest(authActionTypes.LOGIN, loginSaga);
}

// LOGOUT
function* logoutSaga() {
  yield put(logoutSuccess());
}

export function* watcherLogoutSaga() {
  yield takeLatest(authActionTypes.LOGOUT, logoutSaga);
}

// REFRESH ACCESS TOKEN
function* refreshAccessTokenSaga(action: ActionType) {
  try {
    const access_token: {
      data: {
        access_token: string;
      };
    } = yield call(axiosInstance.post, "/api/auth/refresh", {
      refresh_token: action.payload,
    });
    Cookies.set("access_token", access_token.data.access_token);
    yield put(loginSuccess(access_token));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherRefreshAccessTokenSaga() {
  yield takeLatest(authActionTypes.REFRESH_ACCESS, refreshAccessTokenSaga);
}
