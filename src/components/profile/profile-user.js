import ProfileHeader from "./profile-header";
import ProfilePhotos from "./profile.photos";

export const UserProfile = ({imageSrc, setImageSrc}) => {
   return (
    <>
       <ProfileHeader imageSrc={imageSrc} setImageSrc={setImageSrc} />
      <ProfilePhotos />
    </>
  );
};

export default UserProfile;
