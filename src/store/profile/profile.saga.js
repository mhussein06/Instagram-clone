import { takeLatest, all, call, put } from "redux-saga/effects";
import { PROFILE_ACTION_TYPES } from "./profile.types";
import {
  setProfileSuccess,
  setProfileFailed,
  setPhotosSuccess,
  setPhotosFailed,
} from "./profile.actions";

import { getUserPhotosByUserId } from "../../utils/firebase.utils";

export function* getProfile({ payload: user }) {
  try {
    yield put(setProfileSuccess({ ...user }));
  } catch (error) {
    yield put(setProfileFailed(error));
  }
}

export function* getPhotos({ payload: userId }) {
  try {
    const photos = yield call(getUserPhotosByUserId, userId);
    yield put(setPhotosSuccess(photos));
  } catch (error) {
    yield put(setPhotosFailed(error));
  }
}

export function* onSetProfileStart() {
  yield takeLatest(PROFILE_ACTION_TYPES.SET_PROFILE_START, getProfile);
}

export function* onSetPhotosStart() {
  yield takeLatest(PROFILE_ACTION_TYPES.SET_PHOTOS_START, getPhotos);
}

export function* profileSaga() {
  yield all([call(onSetProfileStart), call(onSetPhotosStart)]);
}
