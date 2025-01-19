import { all } from "redux-saga/effects";
import {
  watcherLoginSaga,
  watcherLogoutSaga,
  watcherRefreshAccessTokenSaga,
  watcherCreateAccountSaga,
} from "./features/auth/auth.sagas";
import { watcherGetPostsSaga } from "./features/posts/posts.sagas";

export function* rootSaga() {
  yield all([
    watcherLoginSaga(),
    watcherLogoutSaga(),
    watcherRefreshAccessTokenSaga(),
    watcherCreateAccountSaga(),
    watcherGetPostsSaga(),
  ]);
}
