/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import {
  selectCurrentProfile,
  selectPhotoCollection,
} from "../../store/profile/profile.selector";
import { setProfileFollowers } from "../../store/profile/profile.actions";
import { setCurrentUser } from "../../store/user/user.actions";
import {
  updateFollowedUserFollowers,
  updateLoggedInUserFollowing,
  getUserAvatar,
  updateAvatar,
} from "../../utils/firebase.utils";
import ProfileModal from "../modal/upload-profile-modal";

export const ProfileHeader = ({imageSrc, setImageSrc}) => {
  const currentUser = useSelector(selectCurrentUser);
  const currentProfile = useSelector(selectCurrentProfile);
  const photos = useSelector(selectPhotoCollection);
  const dispatch = useDispatch();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState(currentProfile.profilePicture);
  const [file, setFile] = useState("");
  const activeFollowButton =
    currentUser && currentUser.userId !== currentProfile.userId;


  const handleToggleFollow = async () => {
    //update profile state and user state, create a new array with the new follower/without follower, pass as payload
    let followers = currentProfile.followers;
    const newFollowers = isFollowingProfile
      ? followers.filter((e) => e !== currentUser.userId)
      : [...followers, currentUser.userId];
    const newProfile = {
      ...currentProfile,
      followers: newFollowers,
    };
    //update user state
    let following = currentUser.following;
    const newFollowing = isFollowingProfile
      ? following.filter((e) => e !== currentProfile.userId)
      : [...following, currentProfile.userId];
    const newUser = {
      ...currentUser,
      following: newFollowing,
    };

    //update database
    await updateFollowedUserFollowers(
      currentProfile.docId,
      currentProfile.userId,
      currentUser.userId,
      isFollowingProfile
    );
    await updateLoggedInUserFollowing(
      currentUser.docId,
      currentUser.userId,
      currentProfile.userId,
      isFollowingProfile
    );
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    dispatch(setProfileFollowers(newProfile));
    dispatch(setCurrentUser(newUser));
  };
  useEffect(() => {
    const fetchImageSrc = async () => {
      if (!activeFollowButton) {
        const pfp = currentUser.profilePicture;
        setImageSrc(pfp)
      }
    }
    
    fetchImageSrc();

    const checkUserFollowingProfile = async () => {
      const isFollowing = currentProfile.followers.includes(currentUser.userId);
      setIsFollowingProfile(isFollowing);
    };
    if (currentUser && currentProfile) {
      checkUserFollowingProfile();
    }
  }, [currentProfile, currentUser, activeFollowButton, setImageSrc]);

  const uploadFile = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadAvatar = async () => {
    await updateAvatar(file, currentUser.username);
    setShowModal(false);
    const newPfp = await getUserAvatar(currentUser.username);
    console.log(newPfp);
    setFile("");
    setImageSrc(newPfp);
    const newUser = {
      ...currentUser,
      profilePicture: newPfp,
    }
    dispatch(setCurrentUser(newUser));
  };
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <div className="container flex justify-center items-center">
          {activeFollowButton ? profileImage && (<img
            className="rounded-full h-40 w-40 flex"
            alt={`${currentProfile.username}'s profile picture`}
            src={profileImage}
          />) : imageSrc && (
            <img
            className="rounded-full h-40 w-40 flex"
            alt={`${currentProfile.username}'s profile picture`}
            src={imageSrc}
          />
          )}
        </div>
        <div className="flex items-center justify-center flex-col col-span-2">
          <div className="container flex items-center">
            <p className="text-2xl mr-4"> {currentProfile.username} </p>
            {activeFollowButton && isFollowingProfile === null ? (
              <Skeleton count={1} width={80} height={32} />
            ) : (
              activeFollowButton && (
                <button
                  className="bg-blue-medium font-bold text-sm rounded text-white
                      w-20 h-8"
                  type="button"
                  onClick={handleToggleFollow}
                >
                  {isFollowingProfile ? "Unfollow" : "Follow"}
                </button>
              )
            )}
          </div>
          <div className="container flex mt-4">
            {currentProfile.following === undefined ||
            currentProfile.followers === undefined ||
            photos === null ? (
              <Skeleton count={1} width={677} height={24} />
            ) : (
              <>
                <p className="mr-10 ">
                  <span className="font-bold">
                    {Object.keys(photos).length}
                  </span>
                  {` `}
                  posts
                </p>
                <p className="mr-10 ">
                  <span className="font-bold">
                    {currentProfile.followers.length}
                  </span>
                  {` `}
                  {currentProfile.follwers === 1 ? `follower` : `followers`}
                </p>
                <p className="mr-10 ">
                  <span className="font-bold">
                    {currentProfile.following.length}
                  </span>
                  {`  `}
                  following
                </p>
              </>
            )}
          </div>
          <div className="container mt-4">
            <p className="font-medium">
              {!currentProfile.fullName ? (
                <Skeleton count={1} height={24} />
              ) : (
                currentProfile.fullName
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/3 mt-4 text-center">
        {!activeFollowButton && (
          <button
            className="text-white bg-blue-medium rounded w-2/5"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Edit Photo
          </button>
        )}
        {showModal ? (
          <ProfileModal
            file={file}
            uploadFile={uploadFile}
            setShowModal={setShowModal}
            uploadAvatar={uploadAvatar}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProfileHeader;
