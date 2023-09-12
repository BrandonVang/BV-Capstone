import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchPostDislikes, thunkAddDisLike, thunkRemoveDisLike, fetchUserDisLikes } from "../../store/dislike";
import { fetchAllPosts, fetchFollowingPosts, fetchPostByCommunity, getFollowingPosts } from '../../store/post';
import DislikeButton from "./DislikeButton";
import { fetchCommentsByPost } from "../../store/comment";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";


const Dislikes = ({ post }) => {
    const dispatch = useDispatch();
    const userDislikes = useSelector((state) => state.dislikes.userDisLikes || []); // Ensure userDislikes is an array
    const loggedInUserId = useSelector((state) => state.session.user && state.session.user.id);
    const dislikesId = useSelector((state) => state.dislikes.id)
    const [showMenu, setShowMenu] = useState(false);

    const closeMenu = () => setShowMenu(false);

    let originalDislikeId = null
    const [dislikeId, setDislikeId] = useState(originalDislikeId)

    post.dislikes.forEach(dislike => {
        if (dislike.user_id === loggedInUserId) {
            originalDislikeId = dislike.id;
        }
    })

    useEffect(() => {
        if (userDislikes) {
            const foundDislike = userDislikes.find(
                (dislike) => dislike.post_id === post.id && dislike.user_id === loggedInUserId
            );
            if (foundDislike) {
                originalDislikeId = foundDislike.id;
                setDislikeId(foundDislike.id);
            }
        }
    }, [userDislikes, post.id, loggedInUserId]);

    const isUserDisliked = () => {
        return userDislikes.some((dislike) => dislike.post_id === post.id);
    };

    const hasUserLikedPost = post.likes.some((like) => like.user_id === loggedInUserId);

    const handleDislike = async () => {
        try {
            // If the user has liked the post, prevent disliking
            if (hasUserLikedPost) {
                console.log("User has already liked the post, can't dislike.");
                return;
            }

            if (isUserDisliked()) {
                await dispatch(thunkRemoveDisLike(dislikeId));
            } else {
                const data = await dispatch(thunkAddDisLike(post.id));
                setDislikeId(data.id);
            }

            await Promise.all([
                dispatch(fetchUserDisLikes(loggedInUserId)),
                dispatch(fetchPostByCommunity(post.community.id)),
                dispatch(fetchAllPosts())
            ]);
        } catch (error) {
            console.error("Error handling dislike:", error);
        }
    };

    return (
        <div className="dislikes-container">
            {loggedInUserId ? (
                hasUserLikedPost ? (
                    <i className="fa fa-arrow-down" style={{ color: "white", fontSize: "12px" }} />
                ) : (
                    <DislikeButton isDisliked={isUserDisliked()} onDislike={handleDislike} />
                )
            ) : (
                <OpenModalButton
                    className="login-modal-button"
                    buttonText={
                        <div className="dislikes-container">
                            <i className="fa fa-arrow-down" style={{ color: "white", fontSize: "12px" }} />
                        </div>
                    }
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                />
            )}
        </div>

    );
};

export default Dislikes;
