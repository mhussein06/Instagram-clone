import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { selectPhotoCollection } from "../../store/profile/profile.selector";
import Photo from "./photo";

export const ProfilePhotos = () => {
  const photos = useSelector(selectPhotoCollection);
  let size = 0;
  if (photos) {
    size = Object.keys(photos).length;
  }
  return (
    <div className="h-16 border-t border-gray-primary mt-8 pt-4">
      <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
        {!photos ? (
          <Skeleton variant="rectangular" count={12} width={320} height={400} />
        ) : size > 0 ? (
          photos.map((photo) => {
            return (
              <Photo key={photo.docId} photo={photo} />
            );
          })
        ) : null}
      </div>
      {!photos ||
        (photos.length === 0 && (
          <p className="text-center text-2xl">No Posts Yet</p>
        ))}
    </div>
  );
};

export default ProfilePhotos;
