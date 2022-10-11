import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"

export const ProfileHeader = () => {
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    return (
        <div> I am the profile header </div>
    )

}

export default ProfileHeader