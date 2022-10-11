import Header from "../header";
import { useEffect } from "react";
import { selectCurrentProfile, selectPhotosCollection } from "../../store/profile/profile.selector";
import { useSelector } from "react-redux";


export const UserProfile = () => {
    const profile = useSelector(selectCurrentProfile);
    return (
        <p> My name is {profile.fullName}. I have {profile.followers.length} followers</p>
    )

}

export default UserProfile;