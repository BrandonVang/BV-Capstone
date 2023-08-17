import { useModal } from "../../context/Modal";
import { fetchPostById, fetchAllPosts } from "../../store/post";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { thunkRemoveComment, thunkEditComment, fetchCommentsByPost } from '../../store/comment';


function CommentEditModal({ comment}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [commentContent, setCommentContent] = useState(comment.content);
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState(null);
    const singlePost = useSelector((state) => state.posts.singlePost);

    const handleCancel = (e) => {
        e.preventDefault();
        closeModal();
    }

    const handleCommentEdit = async (e) => {
        e.preventDefault();
        const comment_tobe_updated = { "content": commentContent };
        try {
            await dispatch(thunkEditComment(comment.id, comment_tobe_updated))
            await dispatch(fetchPostById(singlePost.id));
            await dispatch(fetchCommentsByPost(comment.post_id))
            closeModal();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="delete-modal-wrapper">
            <div className="delete-modal-title">
                <h1>Edit Your Comment</h1>
            </div>
            <form onSubmit={handleCommentEdit}>
                <div className='comment-container'>
                    <input
                        className="edit-comment-input"
                        type="text"
                        value={commentContent}
                        placeholder='Send something nice'
                        onChange={(e) => setCommentContent(e.target.value)}
                    />
                </div>
                <div className="delete-modal-button-wrapper">
                    <button className="edit-comment-submit" >Save your comment</button>
                    {/* <button className="cancelDelete-button" onClick={handleCancel}>Cancel</button> */}
                </div>
            </form>


        </div>
    );
}

export default CommentEditModal;
