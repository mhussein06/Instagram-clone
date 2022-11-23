import { PROFILE_ACTION_TYPES } from "./profile.types";
import { LOCATION_CHANGE } from 'react-router-redux';

export const PROFILE_INITIAL_STATE = {
  profile: null,
  photosCollection: null,
  error: null,
  isLoading: true,
};

export const profileReducer = (state = PROFILE_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_ACTION_TYPES.SET_PROFILE_SUCCESS:
      return { ...state, profile: payload, isLoading: false};
    case LOCATION_CHANGE:
      return { PROFILE_INITIAL_STATE };
    case PROFILE_ACTION_TYPES.SET_PROFILE_FOLLOWERS:
      return {...state, profile: payload, isLoading: false}
    case PROFILE_ACTION_TYPES.SET_PHOTOS_SUCCESS:
      return { ...state, photosCollection: payload, isLoading: false };
    case PROFILE_ACTION_TYPES.SET_PROFILE_FAILED:
    case PROFILE_ACTION_TYPES.SET_PHOTOS_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};
