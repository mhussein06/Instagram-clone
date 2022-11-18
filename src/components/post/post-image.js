

export const PostImage = ({ src, caption }) => {
    return (
        <img className="w-full h-full" src={src} alt={caption} />
    )
}

export default PostImage;