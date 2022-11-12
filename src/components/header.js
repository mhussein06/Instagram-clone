import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import { USER_ACTION_TYPES } from "../store/user/user.types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, createPost} from "../utils/firebase.utils";
import { setCurrentUser } from "../store/user/user.actions";
import PostModal from "./modal/upload-post-modal";
import { selectPhotoCollection, selectCurrentProfile } from "../store/profile/profile.selector";
import { setPhotosStart } from "../store/profile/profile.actions";

export const Header = ({ imageSrc, setImageSrc }) => {
  const user = useSelector(selectCurrentUser);
  const photosCollection = useSelector(selectPhotoCollection);
  const profile = useSelector(selectCurrentProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("userId", "==", user.userId)
    );
    let result = {};
    const updateFollow = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        result = {
          ...doc.data(),
          docId: doc.id,
          profilePicture: user.profilePicture,
        };
      });
      dispatch(setCurrentUser(result));
    });
    setImageSrc(user.profilePicture);
    return () => {
      updateFollow();
    };
  }, [dispatch, setImageSrc, user.profilePicture, user.userId]);

  const uploadFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadPost = async (e) => {
    await createPost(caption, user.userId, file);
    if (profile && profile.username === user.username) {
      dispatch(setPhotosStart(user.userId));
    }
    setShowModal(false);
  };

  const signOutHandler = async () => {
    dispatch({ type: USER_ACTION_TYPES.SIGN_OUT_START, payload: null });
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Instagram Logo">
                <img
                  src="/images/logo.png"
                  alt="Instagram"
                  className="mt-4 w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center-flex items-center align-items">
            {user ? (
              <div className="flex mt-4">
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
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
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <button
                  type="button"
                  title="Sign Out"
                  onClick={() => {
                    signOutHandler();
                  }}
                >
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
                  </svg>
                </button>
                <button onClick={() => setShowModal(true)}>
                  <svg
                    className="w-8 mr-6 mt-0.5 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M 7.5 1 C 3.917969 1 1 3.917969 1 7.5 C 1 11.082031 3.917969 14 7.5 14 C 11.082031 14 14 11.082031 14 7.5 C 14 3.917969 11.082031 1 7.5 1 Z M 7.5 2 C 10.542969 2 13 4.457031 13 7.5 C 13 10.542969 10.542969 13 7.5 13 C 4.457031 13 2 10.542969 2 7.5 C 2 4.457031 4.457031 2 7.5 2 Z M 7 4 L 7 7 L 4 7 L 4 8 L 7 8 L 7 11 L 8 11 L 8 8 L 11 8 L 11 7 L 8 7 L 8 4 Z"></path>
                  </svg>
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.username}`}>
                    {imageSrc && (
                      <img
                        className="rounded-full h-8 w-8 flex"
                        src={imageSrc}
                        alt={`${user.username} profile`}
                      />
                    )}
                  </Link>
                </div>
              </div>
            ) : (
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
            )}
            {showModal ? (
              <PostModal
                file={file}
                uploadFile={uploadFile}
                setShowModal={setShowModal}
                setCaption={setCaption}
                uploadPost={uploadPost}
                caption={caption}
              />
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export const MemoizedHeader = React.memo(Header);
