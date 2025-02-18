import { all } from "redux-saga/effects";
import {
  watcherLoginSaga,
  watcherLogoutSaga,
  watcherRefreshAccessTokenSaga,
  watcherCreateAccountSaga,
} from "./features/auth/auth.sagas";
import {
  watcherGetPostsSaga,
  watcherCreatePostSaga,
  watcherUpdatePostLikedSaga,
  watcherCreateCommentSagaSaga,
  watcherDeletePostSaga,
  watcherDeleteCommentSaga,
  watcherUpdateCommentSaga,
  watcherUpdatePostSaga,
} from "./features/posts/posts.sagas";
import { watcherGetTagsSaga } from "./features/tags/tags.sagas";
import { watcherGetUsersSaga } from "./features/users/users.sagas";

export function* rootSaga() {
  yield all([
    watcherLoginSaga(),
    watcherLogoutSaga(),
    watcherRefreshAccessTokenSaga(),
    watcherCreateAccountSaga(),
    watcherGetPostsSaga(),
    watcherCreatePostSaga(),
    watcherDeletePostSaga(),
    watcherUpdatePostSaga(),
    watcherUpdatePostLikedSaga(),
    watcherCreateCommentSagaSaga(),
    watcherDeleteCommentSaga(),
    watcherUpdateCommentSaga(),
    watcherGetTagsSaga(),
    watcherGetUsersSaga(),
  ]);
}
