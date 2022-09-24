import { useDispatch } from "react-redux";
import { ROUTES } from "../constants/routes";
import React from "react";
import { USER_ACTION_TYPES } from "../store/user/user.types";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOutHandler = async () => {
    dispatch({ type: USER_ACTION_TYPES.SIGN_OUT_START, payload: null });
    navigate(ROUTES.LOGIN);
  };
  return (
    <div>
      <button onClick={signOutHandler}>
        <svg
          className="w-8 mr-6 text-black-light cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>{" "}
      </button>
    </div>
  );
};

export default SignOutButton;
