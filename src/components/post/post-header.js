/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-comment-textnodes */
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getUserAvatar } from "../../utils/firebase.utils";
import Skeleton from "react-loading-skeleton";

export const PostHeader = ({ username }) => {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const pfp = await getUserAvatar(username);
      setAvatar(pfp);
    }
    fetchData();
  }, [username])

  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        {!avatar ? (<Skeleton variant="circular" animation="wave" width={40} height={40}/>) : (<Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={avatar}
            alt={`${username}'s profile picture`}
          />
          <p className="font-bold"> {username} </p>
        </Link>)}
      </div>
    </div>
  );
};

PostHeader.propTypes = {
  username: PropTypes.string,
};

export default PostHeader;
