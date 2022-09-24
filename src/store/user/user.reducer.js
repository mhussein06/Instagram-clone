import { USER_ACTION_TYPES } from "./user.types";

export const USER_INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.LOG_IN_SUCCESS:
      return { ...state, currentUser: payload, isLoading: true };
    case USER_ACTION_TYPES.SET_FOLLOWING_SUCCESS:
      return {
        currentUser: {
          following: payload
        }
      };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null };
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SET_FOLLOWING_FAILED:
    case USER_ACTION_TYPES.LOG_IN_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};
