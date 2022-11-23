import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
  getUserAvatar,
} from "../../utils/firebase.utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

export const SuggestedProfile = ({ profile }) => {
  const { username, docId, userId } = profile;
  const [followed, setFollowed] = useState(false);
  const user = useSelector(selectCurrentUser);
  const loggedInUserDocId = user.docId;
  const [imageSrc, setImageSrc] = useState('');

  const handleFollowUser = () => {
    setFollowed(true);
    updateLoggedInUserFollowing(loggedInUserDocId, user.userId, userId, false);
    updateFollowedUserFollowers(
      docId,
      userId,
      user.userId,
      false
    );
  }
  useEffect(() => {
    const fetchData = async () => {
      const pfp = await getUserAvatar(username);
      setImageSrc(pfp)
    }
    fetchData();
  }, [username])

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <Link to={`/p/${username}`}>
       {imageSrc && (<img
          className="rounded-full w-8 h-8 flex mr-3"
          src={imageSrc}
          alt=""
          />)}
          </Link>
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm"> {username} </p>
        </Link>
      </div>
      <div>
        <button
          className="text-xs font-bold text-blue-medium"
          type="button"
          onClick={() => {
            handleFollowUser();
          }}
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
};

SuggestedProfile.propTypes = {
  username: PropTypes.string,
  userId: PropTypes.string,
};

export default SuggestedProfile;
