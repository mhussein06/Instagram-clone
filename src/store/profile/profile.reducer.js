import { PROFILE_ACTION_TYPES } from "./profile.types";

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

    case PROFILE_ACTION_TYPES.SET_PHOTOS_SUCCESS:
      return { ...state, photosCollection: payload };
    case PROFILE_ACTION_TYPES.SET_PROFILE_FAILED:
    case PROFILE_ACTION_TYPES.SET_PHOTOS_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};
