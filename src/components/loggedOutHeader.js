import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { USER_ACTION_TYPES } from "../store/user/user.types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, createPost } from "../utils/firebase.utils";
import { setCurrentUser } from "../store/user/user.actions";
import PostModal from "./modal/upload-post-modal";
import { selectCurrentProfile } from "../store/profile/profile.selector";
import { setPhotosStart } from "../store/profile/profile.actions";

/* TODO
onMount, check user session
header icons:
sign in,
logo takes you to sign in, follow takes you to sign in
*/

export const LoggedOutHeader = () => {
 
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.LOGIN} aria-label="Instagram Logo">
                <img
                  src="/images/logo.png"
                  alt="Instagram"
                  className="mt-4 w-6/12"
                />
              </Link>
            </h1>
          </div>

          <div className="text-gray-700 text-center-flex items-center align-items">
            <div className="flex mt-4">
              <Link to={ROUTES.LOGIN}>
                <button
                  type="button"
                  className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                >
                  Log In
                </button>
              </Link>
              <Link to={ROUTES.SIGN_UP}>
                <button
                  type="button"
                  className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LoggedOutHeader;
