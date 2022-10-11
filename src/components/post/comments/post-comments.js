import { useState } from "react";
import formatDistance from "date-fns/formatDistance";
import { Link } from "react-router-dom";
import AddComment from "./add-comments";

export const PostComments = ({
  docId,
  comments: allComments,
  posted,
  commentInput,
  photoId
}) => {
  const [comments, setComments] = useState(allComments);
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 3 && (
          <p className="text-sm text-gray-base mb-1 cursor-pointer">
            View all comments
          </p>
        )}
        {comments.slice(0, 3).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold"> {item.displayName}</span>
            </Link>
            <span> {item.comment}</span>
          </p>
        ))}
        <p className="text-gray-base uppercase text-xs mt-2">
          {formatDistance(posted, new Date())} ago{" "}
        </p>
      </div>
      <AddComment docId={docId} comments={comments} setComments={setComments}
        commentInput={commentInput} photoId={photoId} />
    </>
  );
};

export default PostComments;
