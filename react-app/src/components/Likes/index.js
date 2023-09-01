import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchPostLikes, thunkAddLike, thunkRemoveLike, fetchUserLikes } from "../../store/like";
import { fetchAllPosts, fetchFollowingPosts, fetchPostByCommunity, getFollowingPosts } from '../../store/post';
import LikeButton from "./Button";
import { fetchCommentsByPost } from "../../store/comment";
import LoginFormModal from "../LoginFormModal";
import OpenModalButton from "../OpenModalButton";


const Likes = ({ post }) => {
    const dispatch = useDispatch();
    const userLikes = useSelector((state) => state.likes.userLikes || []); // Ensure userLikes is an array
    const loggedInUserId = useSelector((state) => state.session.user && state.session.user.id);
    const likesId = useSelector((state) => state.likes.id)
    // const post = useSelector((state) => state.posts.postId)
    const [showMenu, setShowMenu] = useState(false);


    const closeMenu = () => setShowMenu(false);

    let originalLikeId = null
    const [likeId, setLikeId] = useState(originalLikeId)

    post.likes.forEach(like => {
        if (like.user_id === loggedInUserId) {
            originalLikeId = like.id
        }
    })

    // useEffect(() => {
    //     dispatch(fetchPostLikes(post.id));
    // }, [dispatch, post.id]);

    useEffect(() => {
        if (userLikes) {
            const foundLike = userLikes.find(
                (like) => like.post_id === post.id && like.user_id === loggedInUserId
            );
            if (foundLike) {
                originalLikeId = foundLike.id;
                setLikeId(foundLike.id); // Set likeId to the found ID
            }
        }
    }, [userLikes, post.id, loggedInUserId]);

    const isUserLiked = () => {
        return userLikes.some((like) => like.post_id === post.id);
    };

    const handleLike = async () => {
        try {
            if (isUserLiked()) {
                await dispatch(thunkRemoveLike(likeId));
            } else {
                const data = await dispatch(thunkAddLike(post.id));
                setLikeId(data.id);
            }

            await Promise.all([
                dispatch(fetchUserLikes(loggedInUserId)),
                dispatch(fetchPostByCommunity(post.community.id)),
                dispatch(fetchAllPosts())
            ]);
        } catch (error) {
            console.error("Error handling like:", error);
        }
    };

    // const handleLike = async () => {
    //     if (isUserLiked()) {
    //         await dispatch(thunkRemoveLike(likeId));
    //         await dispatch(fetchUserLikes(loggedInUserId));
    //         await dispatch(fetchPostByCommunity(post.community.id));
    //         await dispatch(fetchAllPosts());
    //     } else {
    //         const data = await dispatch(thunkAddLike(post.id));
    //         setLikeId(data.id)
    //         await dispatch(fetchUserLikes(loggedInUserId));
    //         await dispatch(fetchPostByCommunity(post.community.id));
    //         await dispatch(fetchAllPosts());
    //     }
    // };



    return (
        <div className="likes-container">
            {loggedInUserId ? (
                <LikeButton isLiked={isUserLiked()} onLike={handleLike} />
            ) : (
                <OpenModalButton
                    className="login-modal-button"
                    buttonText={
                        <div className="likes-container">
                            <i className="fa fa-arrow-up" style={{ color: "white", fontSize: "12px" }} />
                        </div>
                    }
                    onItemClick={closeMenu} // You'll need to define closeMenu function
                    modalComponent={<LoginFormModal />}
                />
            )}
        </div>
    );
};


export default Likes;
