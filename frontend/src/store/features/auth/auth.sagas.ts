import { put, call, takeLatest } from "redux-saga/effects";
import { axiosInstance } from "@/utils/axios";
import { loginSuccess, logoutSuccess } from "./auth.slice";
import Cookies from "js-cookie";
import { ActionType, UserI } from "@/utils/types";
import { authActionTypes, login } from "./auth.action";

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

// CREATE_ACCOUNT
function* createAccountSaga(action: {
  type: string;
  payload: { email: string; password: string };
}) {
  try {
    const response: { data: UserI } = yield call(
      axiosInstance.post,
      "/api/auth/create_user",
      action.payload
    );
    yield put(
      login({ email: action.payload.email, password: action.payload.password })
    );
  } catch (error) {
    console.log(error);
  }
}

export function* watcherCreateAccountSaga() {
  yield takeLatest(authActionTypes.CREATE_ACCOUNT, createAccountSaga);
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
    yield put(loginSuccess(access_token.data.access_token));
  } catch (error) {
    console.log(error);
  }
}

export function* watcherRefreshAccessTokenSaga() {
  yield takeLatest(authActionTypes.REFRESH_ACCESS, refreshAccessTokenSaga);
}
