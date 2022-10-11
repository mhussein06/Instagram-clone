import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { updateComments } from "../../../utils/firebase.utils";

export const AddComment = ({ docId, comments, setComments, commentInput, photoId }) => {
  const [comment, setComment] = useState("");
  const user = useSelector(selectCurrentUser);
  const displayName = user.username;
  const handleSubmitComment = (event) => {
    event.preventDefault();
      setComments([{ displayName, comment }, ...comments]);
      setComment('');

      //firebase function to add comment
      updateComments({ displayName, comment }, docId, photoId);
    return null;
  };
  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-5 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post{" "}
        </button>
      </form>
    </div>
  );
};

export default AddComment;
