import Skeleton from "react-loading-skeleton";
import Post from "./post/post";

export const UserPost = ({ photo }) => {
    return (
        <div className="container col-span-2">
          {!photo ?
              ( <Skeleton count={4} width={640} height={500}  className="mb-5" /> )
             :  (<Post key={photo.docId} content={photo} />)
          }
        </div>
      );

}

export default UserPost;