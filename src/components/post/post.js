import { useRef } from "react";
import PropTypes from "prop-types";
import PostHeader from "./post-header";
import PostImage from "./post-image.js";
import PostActions from "./post-actions";
import PostFooter from "./post-footer";
import PostComments from "./comments/post-comments";

export const Post = ({ content }) => {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-8">
      <PostHeader username={content.username} />
      <PostImage src={content.imageSrc} caption={content.caption} />
      <PostActions
        docId={content.docId}
        photoId={content.photoId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
          <PostFooter caption={content.caption} username={content.username} />
          <PostComments docId={content.docId} comments={content.comments}
              posted={content.dateCreated} commentInput={commentInput} />
    </div>
  );
};

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string,
    imageSrc: PropTypes.string,
    caption: PropTypes.string,
    docId: PropTypes.string,
    userLikedPhoto: PropTypes.bool,
    likes: PropTypes.array,
    comments: PropTypes.array,
    dateCreated: PropTypes.number,
    photoId: PropTypes.number,
  }),
};

export default Post;
