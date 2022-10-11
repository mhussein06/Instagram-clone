import { all, call } from "redux-saga/effects";
import { userSaga } from "./user/user.saga";
import { profileSaga } from "./profile/profile.saga";

export function* rootSaga() {
  yield all([call(userSaga), call(profileSaga)]);
}
