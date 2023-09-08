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
import About from '../About/Footer';
import CreateMediaForm from '../CreatePost/CreateMedia';
import Person from "../../images/person.jpg"
import { fetchLoggiedInUserCommunities, fetchRemoveCommunities, fetchAddCommunities, fetchAllCommunities } from '../../store/community';
import { fetchFollowingPosts, fetchAllPosts } from '../../store/post';
import Avatar from "../../images/comment-avatar.png"

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
    const loggedInUserId = useSelector((state) => state.session.user && state.session.user.id);
    const loggedInUserFollowing = useSelector((state) => state.communities.userCommunities);


    const handleFollow = (communityId) => {
        dispatch(fetchAddCommunities(communityId)).then(() => {
            dispatch(fetchLoggiedInUserCommunities());
            dispatch(fetchAllCommunities())
            dispatch(fetchAllPosts())
        });
    };

    const handleUnfollow = (communityId) => {
        dispatch(fetchRemoveCommunities(communityId)).then(() => {
            dispatch(fetchLoggiedInUserCommunities());
            dispatch(fetchAllCommunities())
            dispatch(fetchAllPosts())
        });
    };

    const isUserFollowing = (communityId) => {
        if (Array.isArray(loggedInUserFollowing)) {
            return loggedInUserFollowing.some((followedUser) => followedUser.id === communityId);
        }
        return false;
    };

    // Check if it's the user's own post
    const isOwnPost = posts?.user?.id === currentUser;

    // Check if the logged-in user is following the community
    const isCurrentUserFollowingPostUser = isUserFollowing(posts?.community?.id);


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
            <div className="detail-index">

                <div className="detail-main-content">
                    <div className="detail-vote">
                        <i className="fa fa-arrow-up" aria-hidden="true"></i>
                        <p className="detail-count">{post.likes_count}</p>
                        <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    </div>
                    <div className="detail-author">

                        <div className="detail-creator">
                            <p className="detail-community">r/{post.community.name}</p>
                            <p className="detail-user">Posted by: {post.user.username}</p>
                        </div>
                        <h1 className="detail-title">{post.title}</h1>
                        {post.medias.length > 0 && (
                            <img src={post.medias[0].media_url} alt="Post Media" className="detail-image" />
                        )}
                        <p className="detail-content">{post.content}</p>
                    </div>
                    <p className="detail-comments-count"><i className='far fa-comment'></i> {posts.comments.length} Comments </p>
                    {currentUser ? (
                        <>
                            <div className="detail-comment-submit-container">

                                <p className="comment-as">Comments as <span className="detail-username-color">{currentUser.username}</span>:</p>
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
                            className='comment-login'

                        >
                        </OpenModalButton>
                    )
                    }
                    <div className="detail-comment-area">

                        {
                            posts.comments.map((comment) => (
                                <div key={comment.id} className="detail-comment-container">
                                    <p className="detail-comment">
                                        <span className="comment-icon">
                                            <img src={Avatar} alt="User Icon" className="comment-user-icon" />
                                        </span>
                                        {comment.username}, {comment.post_date}
                                    </p>
                                    <p className="detail-comments">{comment.content}</p>

                                    {/* {currentUser && currentUser.id === comment.user_id && (
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
                                    )} */}

                                    <div className='post-index-item-menu'>
                                        <i className="fas fa-ellipsis-h"></i>

                                        {currentUser && currentUser.id === comment.user_id &&
                                            (
                                                <div className="dropdown-content">
                                                    <div className='postitem-delete-edit-wrapper'>
                                                        <OpenModalMenuItem
                                                            className="delete-menu"
                                                            itemType='delete_icon'
                                                            itemText='Delete'
                                                        modalComponent={<DeleteConfirmModal comments={comment} post={post} type="comment" />}
                                                        />
                                                        <OpenModalMenuItem
                                                            className="edit-menu"
                                                            itemType='edit_icon'
                                                            itemText="Update"
                                                        modalComponent={<CommentEditModal comment={comment} />}
                                                        // onItemClick={closeMenu}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
            <div className='info-container'>
                <div className='post-sidebar'>
                    <div className='l-descri'>
                        <div className="person-logo-and-heading">
                            {/* <img className="person-logo" src={Person} alt="Person Logo" /> */}
                            <h2>About Community</h2>
                        </div>
                        <p>A community for {post.community.name} discussion</p>

                        <div className='title-bar-follow-cont'>
                            {currentUser && !isOwnPost && !isCurrentUserFollowingPostUser && (
                                <button className='detail-follow-but' onClick={() => handleFollow(post.community.id)}>Join</button>
                            )}
                            {currentUser && !isOwnPost && isCurrentUserFollowingPostUser && (
                                <button className='detail-unfollow-but' onClick={() => handleUnfollow(post.community.id)}>Leave</button>
                            )}
                        </div>
                        <div className='about-foot'>


                            <About />
                        </div>
                    </div>
                </div>
                <div className='community-rules'>
                    <h3>/{post.community.name} rules</h3>
                    <ul className='rules'>
                        <li>
                            1. Be civil and respectful
                        </li>
                        <li>
                            2. No trolling or baiting users
                        </li>
                        <li>
                            3. No racist, sexist, or homophobic language
                        </li>
                        <li>
                            4. No Reposts
                        </li>
                        <li>
                            5. No Fake News
                        </li>
                        <li>
                            6 No self-promotion
                        </li>
                        <li>
                            7. No NSFW-content
                        </li>
                        <li>
                            8. Posts and Comments must be relevant to community
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    );
}

export default PostDetailPage;
