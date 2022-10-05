import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { memo } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { db } from "../../utils/firebase.utils";
import { onSnapshot } from "firebase/firestore";

export const User = ({ username, fullName }) => {
  const user = useSelector(selectCurrentUser);
  const [following, setFollowing] = useState(user.following);

//   useEffect(() => {
//     db.collection("users")
//       .doc(user.docId)
//       .onSnapshot((snapshot) => {
//         updateFollowing(snapshot.data().following);
//       });
//   }, []);

  function updateFollowing(newFollowing) {
    setFollowing(newFollowing);
  }
    
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 flex mr-3"
          alt=""
          src={`images/avatars/${username}.jpg`}
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm"> {username} </p>
        <p className="text-sm"> {fullName} </p>
      </div>
    </Link>
  );
};
export default memo(User);

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};
