import React, { useState, useEffect } from "react";
import './Dislike.css'

const DislikeButton = ({ isDisliked, onDislike }) => {
    const [disliked, setDisliked] = useState(isDisliked);
    const [iconColor, setIconColor] = useState(isDisliked ? "#7193ff" : "white");

    useEffect(() => {
        setDisliked(isDisliked);
        setIconColor(isDisliked ? "#7193ff" : "white");
    }, [isDisliked]);

    const handleClick = () => {
        setDisliked((prevDisliked) => !prevDisliked);
        setIconColor((prevColor) => (prevColor === "#7193ff" ? "white" : "#7193ff"));

        onDislike();
    };

    return (
        <div className="dislike" onClick={handleClick}>
            <i className="fa fa-arrow-down" style={{ color: iconColor }} />
        </div>
    );
};

export default DislikeButton;
