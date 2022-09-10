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
      <button onClick={signOutHandler}> Sign Out </button>
    </div>
  );
};

export default SignOutButton;
