import { PROFILE_ACTION_TYPES } from "./profile.types";
import { createAction } from "../../utils/reducer.utils";

export const setProfileStart = (username) =>
  createAction(PROFILE_ACTION_TYPES.SET_PROFILE_START,  username );

export const setProfileSuccess = (user) =>
  createAction(PROFILE_ACTION_TYPES.SET_PROFILE_SUCCESS, user );

export const setProfileFailed = (error) =>
  createAction(PROFILE_ACTION_TYPES.SET_PROFILE_START,  error );

export const setPhotosStart = (userId) => 
  createAction(PROFILE_ACTION_TYPES.SET_PHOTOS_START, userId);

export const setPhotosSuccess = (photos) =>
  createAction(PROFILE_ACTION_TYPES.SET_PHOTOS_SUCCESS, photos );

export const setPhotosFailed = (error) =>
  createAction(PROFILE_ACTION_TYPES.SET_PHOTOS_START, error );

export const setProfileFollowers = (followers) =>
  createAction(PROFILE_ACTION_TYPES.SET_PROFILE_FOLLOWERS, followers);