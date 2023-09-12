import React, { useState, useEffect } from "react";
import './Dislike.css'

const DislikeButton = ({ isDisliked, onDislike }) => {
    const [disliked, setDisliked] = useState(isDisliked);
    const [iconColor, setIconColor] = useState(isDisliked ? "blue" : "white");

    useEffect(() => {
        setDisliked(isDisliked);
        setIconColor(isDisliked ? "blue" : "white");
    }, [isDisliked]);

    const handleClick = () => {
        setDisliked((prevDisliked) => !prevDisliked);
        setIconColor((prevColor) => (prevColor === "blue" ? "white" : "blue"));

        onDislike();
    };

    return (
        <div className="dislike" onClick={handleClick}>
            <i className="fa fa-arrow-down" style={{ color: iconColor }} />
        </div>
    );
};

export default DislikeButton;
