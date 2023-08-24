import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostIndexItem from '../LandingPage/indexitem';
import FilterIndexItem from './FilterIndexItem';
import { fetchPostByCommunity, fetchAllPosts, fetchFollowingPosts } from '../../store/post';
import { fetchAllCommunities } from '../../store/community';
import OpenModalButton from '../OpenModalButton';
import CreateMediaForm from '../CreatePost/CreateMedia';
import { fetchUserLikes } from '../../store/like';
import '../LandingPage/PostIndex.css';


const CommunityPosts = () => {
    const { communityId } = useParams();
    const getCurrentUser = (state) => state.session.user;
    const user = useSelector(getCurrentUser);
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.communityPosts[communityId] || []);
    const userCommunities = useSelector(state => state.communities.userCommunities);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        dispatch(fetchPostByCommunity(communityId));
        dispatch(fetchAllCommunities())

        if (user) {
            try {
                dispatch(fetchUserLikes(user.id));
            } catch (e) {
                return
            }
        }
    }, [dispatch, communityId, user]);


    return (
        <div className='home-wrapper'>
            <div className='post-index-all'>
                {Array.isArray(allPosts) && allPosts.map(post => (
                    <FilterIndexItem key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default CommunityPosts;
