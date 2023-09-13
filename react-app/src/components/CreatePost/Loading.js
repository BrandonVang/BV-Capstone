import React, { useState } from "react";

const PostImage = ({ mediaUrl }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className='postItem-img'>
            {isLoading && <div className="loading-spinner">Loading...</div>}
            {mediaUrl.endsWith("mp4") ? (
                <video controls width="490" height="360">
                    <source src={mediaUrl} type="video/mp4" />
                </video>
            ) : (
                <img alt='image' src={mediaUrl} onLoad={handleImageLoad} />
            )}
        </div>
    );
};

export default PostImage;
