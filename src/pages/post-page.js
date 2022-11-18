import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPhotoByDocId } from "../utils/firebase.utils";
import { MemoizedHeader } from "../components/header";
import { MemoizedSidebar } from "../components/sidebar";
import UserPost from "../components/user-post";


export const PostPage = () => {
    const { postId } = useParams();
    const [photo, setPhoto] = useState(null);
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          const data = await getPhotoByDocId(postId);
            setPhoto(data);
        }
        fetchData();
    }, [postId])
    return (
        <div className="bg-gray-background">
        <div>
        <MemoizedHeader imageSrc={imageSrc} setImageSrc={setImageSrc}/>
          <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <UserPost photo={photo} />
            <MemoizedSidebar />
          </div>
        </div> 
    </div>
    )
}

export default PostPage;