import React, { useState, useEffect } from "react";
import "./Like.css";

const DisLikeButton = ({ isLiked, onLike }) => {
    const [liked, setLiked] = useState(isLiked);
    const iconColor = liked ? "blue" : "white";

    const handleClick = () => {
        setLiked((prevLiked) => !prevLiked);
        onLike();
    };

    return (
        <div className="like-button" onClick={handleClick}>
            <i className="fa fa-arrow-down" style={{ color: iconColor }} />
        </div>
    );
};

export default DisLikeButton;
