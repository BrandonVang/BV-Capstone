import { useModal } from "../../context/Modal";
import './DeleteConfirmModal.css';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeletePostById, fetchFollowingPosts, fetchAllPosts, fetchPostById, fetchPostByCommunity } from '../../store/post';
import { thunkRemoveComment, fetchCommentsByPost } from '../../store/comment';
import { fetchLoggiedInUserCommunities, fetchAllCommunities } from "../../store/community";
import { thunkDeleteMedia } from '../../store/media'


function DeleteConfirmModal({ comments, post, type }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    }

    const handleDeleteComment = async (commentId) => {
        try {
            await dispatch(thunkRemoveComment(commentId));
            closeModal();
            await dispatch(fetchCommentsByPost(comments.post_id))
            await dispatch(fetchPostById(post.id));
        } catch (error) {
            console.log(error);
        }
    }


    const handleDeletePost = async (post) => {
        try {
            await dispatch(thunkDeletePostById(post));
            await dispatch(fetchFollowingPosts());
            await dispatch(fetchPostByCommunity(post.community.id))
            await dispatch(fetchAllPosts());
            closeModal();
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="delete-modal-wrapper">
            <div className="delete-modal-title">
                <h1>Confirm Delete</h1>
            </div>
            <div className="delete-confirm-text">
                <p>Are you sure you want to delete this {type} ?</p>
            </div>
            <div className="delete-modal-button-wrapper">
                {type === 'comment' && <button className="delete-button" onClick={() => handleDeleteComment(comments.id)}>Yes (Delete {type})</button>}
                {type === 'post' && <button className="delete-button" onClick={() => handleDeletePost(post)}>Yes (Delete {type})</button>}
                <button className="cancelDelete-button" onClick={handleCancel}>No (Keep {type})</button>
            </div>
        </div>
    );
}

export default DeleteConfirmModal;
