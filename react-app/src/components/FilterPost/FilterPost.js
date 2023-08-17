import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostIndexItem from '../LandingPage/indexitem'; // Replace with the actual path to your PostIndexItem component
import { fetchPostByCommunity, fetchAllPosts } from '../../store/post';
import { fetchAllCommunities } from '../../store/community';
import OpenModalButton from '../OpenModalButton';
import CreateMediaForm from '../CreatePost/CreateMedia';
import '../LandingPage/PostIndex.css';

const CommunityPosts = () => {
    const { communityId } = useParams();
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.communityPosts[communityId] || []);
    const userCommunities = useSelector(state => state.communities.userCommunities);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        dispatch(fetchAllCommunities())
        dispatch(fetchPostByCommunity(communityId));
    }, [dispatch, communityId]);

    const closeMenu = () => setShowMenu(false);

    return (
        <div className='home-wrapper'>
            <div className='post-index-all'>
                {Array.isArray(allPosts) && allPosts.map(post => (
                    <PostIndexItem key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default CommunityPosts;
