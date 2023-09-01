import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchPostLikes, thunkAddLike, thunkRemoveLike, fetchUserLikes } from "../../store/like";
import { fetchAllPosts, fetchFollowingPosts, fetchPostByCommunity, getFollowingPosts } from '../../store/post';
import LikeButton from "./Button";
import { fetchCommentsByPost } from "../../store/comment";


const Likes = ({ post }) => {
    const dispatch = useDispatch();
    const userLikes = useSelector((state) => state.likes.userLikes || []); // Ensure userLikes is an array
    const loggedInUserId = useSelector((state) => state.session.user && state.session.user.id);
    // const post = useSelector((state) => state.posts.postId)


    let originalLikeId = null
    post.likes.forEach(like => {
        if (like.user_id === loggedInUserId) {
            originalLikeId = like.id
        }
    })
    const [likeId, setLikeId] = useState(originalLikeId)

    // useEffect(() => {
    //     dispatch(fetchPostLikes(post.id));
    // }, [dispatch, post.id]);

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

    return (
        <div>
            {loggedInUserId && (
                <div className="likes-container">
                    <LikeButton isLiked={isUserLiked()} onLike={handleLike} />
                </div>
            )}
        </div>
    );
};

export default Likes;
