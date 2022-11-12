import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../utils/firebase.utils";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

export const SuggestedProfile = ({ profile }) => {
  const { username, docId, userId } = profile;
  const [followed, setFollowed] = useState(false);
  const user = useSelector(selectCurrentUser);
  const loggedInUserDocId = user.docId;

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

  //TODO
  //Handle followers discerns if user is already followed or not, follows/unfollows accordingly

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <Link to={`/p/${username}`}>
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
          />
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
