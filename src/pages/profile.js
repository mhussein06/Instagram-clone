import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserSnapshotFromUsername } from "../utils/firebase.utils";
import { ROUTES } from "../constants/routes";
import Header from "../components/header";
import ProfileHeader from "../components/profile/profile-header";
import { useDispatch } from "react-redux";
import {
  setProfileStart,
  setPhotosStart,
} from "../store/profile/profile.actions";
import { PROFILE_ACTION_TYPES } from "../store/profile/profile.types";
import UserProfile from "../components/profile/user-profile";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../store/profile/profile.selector";

export const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserSnapshotFromUsername(username);
      if (user != null) {
        dispatch(setProfileStart(user));
        console.log("profile page", user.userId);
        dispatch(setPhotosStart(user.userId));
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [dispatch, navigate, username]);
  return (
    <div className="bg-background-gray">
      <Header />
      {!isLoading && (
        <>
          <div className="mx-auto max-w-screen-lg">
            <UserProfile />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
