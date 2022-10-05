import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import usePhotos from "../hooks/use-photos";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
import React from "react";
import Post from "./post/post";

export const Timeline = () => {
  const user = useSelector(selectCurrentUser);
  const { photos } = usePhotos(user);

  return (
    <div className="container col-span-2">
      {!photos ? 
          <Skeleton count={4} width={640} height={500}  className="mb-5" />
         : photos?.length > 0 ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text-center text-2xl"> Follow people to see photos </p>
      )}
    </div>
  );
};

export const MemoizedTimeline = React.memo(Timeline);
