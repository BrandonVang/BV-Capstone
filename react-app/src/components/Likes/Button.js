import React, { useState, useEffect } from "react";
import './Like.css'

const LikeButton = ({ isLiked, onLike }) => {
    const [liked, setLiked] = useState(isLiked);
    const [iconColor, setIconColor] = useState(isLiked ? "red" : "white");

    // Update the "liked" state and icon color whenever the "isLiked" prop changes
    useEffect(() => {
        setLiked(isLiked);
        setIconColor(isLiked ? "red" : "white");
    }, [isLiked]);

    const handleClick = () => {
        setLiked((prevLiked) => !prevLiked);
        setIconColor((prevColor) => (prevColor === "red" ? "white" : "red"));

        onLike();
    };

    return (
        <div className="like-button" onClick={handleClick}>
            <i className="fa fa-arrow-up" style={{ color: iconColor }} />
        </div>
    );
};

export default LikeButton;
