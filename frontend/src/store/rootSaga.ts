import { all } from "redux-saga/effects";
import {
  watcherLoginSaga,
  watcherLogoutSaga,
  watcherRefreshAccessTokenSaga,
  watcherCreateAccountSaga,
} from "./features/auth/auth.sagas";
import { watcherGetPostsSaga, watcherCreatePostSaga } from "./features/posts/posts.sagas";
import { watcherGetTagsSaga } from "./features/tags/tags.sagas";

export function* rootSaga() {
  yield all([
    watcherLoginSaga(),
    watcherLogoutSaga(),
    watcherRefreshAccessTokenSaga(),
    watcherCreateAccountSaga(),
    watcherGetPostsSaga(),
    watcherCreatePostSaga(),
    watcherGetTagsSaga()
  ]);
}
