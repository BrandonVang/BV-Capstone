import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeletePostById } from '../../store/post';
import OpenModalMenuItem from '../LandingPage/OpenModalMenuItem';
import DeleteConfirmModal from '../Delete';
import EditPostForm from '../CreatePost/EditPostForm';
import '../LandingPage/PostIndex.css';
import { fetchFollowingPosts, fetchAllPosts } from '../../store/post';
import { fetchLoggiedInUserCommunities, fetchRemoveCommunities, fetchAddCommunities, fetchAllCommunities } from '../../store/community';
import React, { useState } from 'react';
import Likes from '../Likes';

const FilterIndexItem = ({ post, fromPath }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const getCurrentUser = (state) => state.session.user;
    const loggedInUserFollowing = useSelector((state) => state.communities.userCommunities);
    const loggedInUserId = useSelector((state) => state.session.user && state.session.user.id);
    const currentUser = useSelector(getCurrentUser);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };


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
        return loggedInUserFollowing.some((followedUser) => followedUser.id === communityId);
    };

    // Check if it's the user's own post
    const isOwnPost = post.user.id === loggedInUserId;

    // Check if the logged-in user is following the community
    const isCurrentUserFollowingPostUser = isUserFollowing(post.community.id);


    return (
        <div className='post-index-item-wrapper'>


            <div className="post-index-item">
                <div className='title-bar-container'>

                    <div className="landing-detail-vote">
                        <Likes post={post} />
                        <p className="detail-count">{post.likes_count}</p>
                        <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    </div>

                    <div className='postItem-title-bar'>
                        <Link to={`/posts/community/${post.community.id}`} className='community-link'>
                            <span className='community'> /{post.community.name} </span>
                        </Link>
                        <Link to={`/posts/${post.id}`} className='post-title-link'>
                            <div className='post-user-follow'>
                                <span className='title-bar-username'>Posted By {post.user.username} </span>
                            </div>
                        </Link>
                    </div>


                    <div className='title-bar-follow-cont'>
                        {currentUser && !isOwnPost && !isCurrentUserFollowingPostUser && (
                            <button className='follow-but' onClick={() => handleFollow(post.community.id)}>Join</button>
                        )}
                        {currentUser && !isOwnPost && isCurrentUserFollowingPostUser && (
                            <button className='unfollow-but' onClick={() => handleUnfollow(post.community.id)}>Leave</button>
                        )}
                    </div>

                    {/* <div className='post-index-item-menu'>
                        <i className="fas fa-ellipsis-h"></i>

                        {currentUser && currentUser.id === post.user.id &&
                            (
                                <div className="dropdown-content">
                                    <div className='postitem-delete-edit-wrapper'>
                                        <OpenModalMenuItem
                                            className="delete-menu"
                                            itemType='delete_icon'
                                            itemText='Delete'
                                            modalComponent={<DeleteConfirmModal post={post} type='post' />}
                                        />
                                        <OpenModalMenuItem
                                            className="edit-menu"
                                            itemType='edit_icon'
                                            itemText="Update"
                                            modalComponent={<EditPostForm post={post} />}
                                        // onItemClick={closeMenu}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </div> */}
                </div>
                <Link className="postItem-title-center" to={`/posts/${post.id}`}>
                    <div className='post-title'>
                        <h2>{post.title}</h2>
                    </div>

                    <div className=''>
                        <div className='postItem-img-wrapper'>
                            {post.medias.map((item, index) => (
                                <div className='postItem-img' key={index}>
                                    {item.media_url.endsWith("mp4") &&
                                        (
                                            <video controls width="490" height="360">
                                                <source src={`${item.media_url}`} type="video/mp4" />
                                            </video>
                                        )
                                    }
                                    {!item.media_url.endsWith("mp4") &&
                                        <img alt='image' src={`${item.media_url}`} />
                                    }
                                </div>
                            ))}


                        </div>
                        <div>
                            <p>{post.content}</p>
                        </div>

                    </div>
                </Link>
                <div className='post-index-item-menu'>
                    <i className="fas fa-ellipsis-h"></i>

                    {currentUser && currentUser.id === post.user.id &&
                        (
                            <div className="dropdown-content">
                                <div className='postitem-delete-edit-wrapper'>
                                    <OpenModalMenuItem
                                        className="delete-menu"
                                        itemType='delete_icon'
                                        itemText='Delete'
                                        modalComponent={<DeleteConfirmModal post={post} type='post' />}
                                    />
                                    <OpenModalMenuItem
                                        className="edit-menu"
                                        itemType='edit_icon'
                                        itemText="Update"
                                        modalComponent={<EditPostForm post={post} />}
                                    // onItemClick={closeMenu}
                                    />
                                </div>
                            </div>
                        )
                    }
                </div>

            </div >


        </div>
    );
};

export default FilterIndexItem;
