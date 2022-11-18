import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserSnapshotFromUsername } from "../utils/firebase.utils";
import { ROUTES } from "../constants/routes";
import { MemoizedHeader } from "../components/header";

import { useDispatch } from "react-redux";
import {
  setProfileStart,
  setPhotosStart,
} from "../store/profile/profile.actions";
import { useState } from "react";

import UserProfile from "../components/profile/profile-user";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../store/profile/profile.selector";
import { selectCurrentUser } from "../store/user/user.selector";
import { LoggedOutHeader } from "../components/loggedOutHeader";

export const Profile = () => {
  const { username } = useParams();
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserSnapshotFromUsername(username);
      if (user != null) {
        dispatch(setProfileStart(user));
        dispatch(setPhotosStart(user.userId));
      } else {
        navigate(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [dispatch, navigate, username]);
  return (
    <div className="bg-background-gray">
      {currentUser ? (
        <MemoizedHeader imageSrc={imageSrc} setImageSrc={setImageSrc} />
      ) : (
        <LoggedOutHeader />
      )}
      {!isLoading && (
        <div className="mx-auto max-w-screen-lg">
          <UserProfile imageSrc={imageSrc} setImageSrc={setImageSrc} />
        </div>
      )}
    </div>
  );
};

export default Profile;
