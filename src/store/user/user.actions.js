import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer.utils";

export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const signInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.LOG_IN_START, { email, password });

export const signInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.LOG_IN_SUCCESS, user);

export const signInFailed = (error) =>
  createAction(USER_ACTION_TYPES.LOG_IN_FAILED, error);

export const signUpStart = (email, password, displayName, fullName) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_START, {
    email,
    password,
    displayName,
    fullName,
  });

//TODO
//action creator takes user doc id, is dispatch when header is rendered, grabs following/followers,
//sets the following/followers for the state on success
export const setFollowingStart = (userDocId) => {
  createAction(USER_ACTION_TYPES.SET_FOLLOWING_START, userDocId);
};

export const setFollowingSuccess = (following) => {
  createAction(USER_ACTION_TYPES.SET_FOLLOWING_SUCCESS, {
    following,
  });
};

export const setFollowingFailed = (error) =>
  createAction(USER_ACTION_TYPES.SET_FOLLOWING_FAILED, error);

export const setFollowersStart = (userDocId) => {
  createAction(USER_ACTION_TYPES.SET_FOLLOWING_START, {
    userDocId,
  });
};

export const setFollowersSuccess = (followers) => {
  createAction(USER_ACTION_TYPES.SET_FOLLOWING_SUCCESS, {
    followers,
  });
};

export const setFollowersFailed = (error) =>
  createAction(USER_ACTION_TYPES.SET_FOLLOWING_FAILED, error);

export const signUpSuccess = (user, additionalDetails) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });

export const signUpFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START, {});

export const signOutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);
