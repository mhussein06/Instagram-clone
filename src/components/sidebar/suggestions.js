import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../utils/firebase.utils";
import SuggestedProfile from "./suggested-profile";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";

export const Suggestions = () => {
  const [profiles, setProfiles] = useState(null);
  const user = useSelector(selectCurrentUser)

  useEffect(() => {
    const suggestedProfiles = async () => {
      const response = await getSuggestedProfiles(user.userId);
      setProfiles(response);
    };
    return () => {
      suggestedProfiles();
    }
  }, [user]);

  return !profiles ? (
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggestions for you</p>
      </div>
      <div className="mt-4 grid gap-5">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.userId}
            profile= {profile}
          />
        ))}
      </div>
    </div>
  ) : null;
};

Suggestions.propTypes = {
  userId: PropTypes.string,
};

export default Suggestions;
