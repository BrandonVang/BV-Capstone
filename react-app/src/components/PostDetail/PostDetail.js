import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../store/post";
import { thunkCreateComment, fetchCommentsByPost } from "../../store/comment";
import LoginFormModal from "../LoginFormModal";
import './PostDetail.css'
import CommentEditModal from "./CommentEdit";
import OpenModalMenuItem from "../LandingPage/OpenModalMenuItem";
import OpenModalButton from "../OpenModalButton"
import DeleteConfirmModal from "../Delete/index"
import DeleteIcon from "../Icons/DeleteIcon";
import EditIcon from "../Icons/EditIcon";

function PostDetailPage() {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const posts = useSelector(state => state.posts.singlePost)
    const currentUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [error, setError] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedPost = await dispatch(fetchPostById(postId));
                setPost(fetchedPost);

                const fetchedComments = await dispatch(fetchCommentsByPost(postId));
                setComments(fetchedComments);
            } catch (error) {
                console.error("An error occurred while fetching post details:", error);
            }
        };

        fetchData();
    }, [dispatch, postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (commentContent.length < 10 || commentContent.length > 200) {
            setError("Comment must be between 10 and 200 characters");
            return;
        }
        const comment_tobe_added = { "content": commentContent };
        try {
            await dispatch(thunkCreateComment(post.id, comment_tobe_added))
            await dispatch(fetchPostById(postId))
                .then((fetchedPost) => {
                    setPost(fetchedPost);
                    setComments(fetchedPost.comments);
                })
            setCommentContent("");
            setError("");
        } catch (error) {
            console.log(error)
        }
    }


    posts.comments.sort((comment1, comment2) => {
        const a = new Date(comment1.post_date);
        const b = new Date(comment2.post_date);
        return b - a;
    });

    const closeMenu = () => setShowMenu(false);

    return (
        <div className="detail-container">

            <div className="detail-main-content">
                <div className="detail-vote">
                    <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    <p className="detail-count">{post.likes_count}</p>
                    <i className="fa fa-arrow-down" aria-hidden="true"></i>
                </div>
                <div className="detail-author">

                    <div className="detail-creator">
                        <p className="detail-communnity">r/{post.community.name}</p>
                        <p className="detail-user">Posted by: {post.user.username}</p>
                    </div>
                    <h1 className="detail-title">{post.title}</h1>
                    {post.medias.length > 0 && (
                        <img src={post.medias[0].media_url} alt="Post Media" className="detail-image" />
                    )}
                    <p className="detail-content">{post.content}</p>
                </div>
                <p className="detail-comments-count"><i className='far fa-comment'></i> {posts.comments.length} Comments </p>
            </div>
            {currentUser ? (
                <>
                    <div className="detail-comment-submit-container">

                        <p className="comment-as">Comments as {currentUser.username}:</p>
                        {error && <p className="comment-error">{error}</p>}
                        <form className='comment-form-container' onSubmit={handleCommentSubmit}>
                            <div className='comment-form-content'>
                                <input
                                    className='comment-submit'
                                    type="text"
                                    value={commentContent}
                                    placeholder='What are your thoughts?'
                                    onChange={(e) => setCommentContent(e.target.value)}
                                />
                            </div>
                            <div className="comment-reply-container"><button className='comment-reply'>Comment</button></div>
                        </form>
                    </div>
                </>
            ) : (
                <OpenModalButton
                    modalComponent={<LoginFormModal />}
                    onItemClick={closeMenu}
                    buttonText="+ Add Comment"
                >
                </OpenModalButton>
            )
            }

            <div className="detail-comment-area">

                {
                    posts.comments.map((comment) => (
                        <div key={comment.id} className="detail-comment-container">
                            <p className="detail-comment">{comment.username}, {comment.post_date}</p>
                            <p className="detail-comments">{comment.content}</p>

                            {currentUser && currentUser.id === comment.user_id && (
                                <div className="detail-icons">
                                    <OpenModalMenuItem
                                        itemType='delete_icon'
                                        itemText='Delete'
                                        modalComponent={<DeleteConfirmModal comments={comment} post={post} type="comment" />}
                                    />
                                    <OpenModalMenuItem
                                        itemType='edit_icon'
                                        itemText="Edit"
                                        modalComponent={<CommentEditModal comment={comment} />}
                                    />
                                </div>
                            )}
                        </div>
                    ))
                }
            </div>
        </div >
    );
}

export default PostDetailPage;
