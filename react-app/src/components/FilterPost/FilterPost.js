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
import Profile from '../../images/profile.png'
import Person from "../../images/person.jpg"
import About from '../About/Footer';


const CommunityPosts = () => {
    const { communityId } = useParams();
    const getCurrentUser = (state) => state.session.user;
    const user = useSelector(getCurrentUser);
    const dispatch = useDispatch();
    const allPosts = useSelector(state => state.posts.communityPosts[communityId] || []);
    const userCommunities = useSelector(state => state.communities.userCommunities);
    const [showMenu, setShowMenu] = useState(false);
    const community = useSelector(state => state.communities.allCommunity[communityId] || null);


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

    const closeMenu = () => setShowMenu(false);

    return (
        <div className='home-wrapper'>
            <div className='post-index-all'>
                {user && (
                    <div className='create-post-button-wrapper'>
                        <>

                            <div className="avatar-area">
                                <img src={Profile} alt="User Avatar" className='user-avatar' />
                            </div>

                            {/* Create Post button */}
                            <OpenModalButton
                                modalComponent={<CreateMediaForm />}
                                onItemClick={closeMenu}
                                className="create-post-sec"
                                buttonText="Create Post"
                            >
                                Create Post
                            </OpenModalButton>
                        </>
                    </div>
                )}
                {Array.isArray(allPosts) && allPosts.map(post => (
                    <FilterIndexItem key={post.id} post={post} />
                ))}
            </div>

            <div className='info-container'>
                <div className='post-sidebar'>
                    <div className='l-descri'>
                        <div className="person-logo-and-heading">
                            {/* <img className="person-logo" src={Person} alt="Person Logo" /> */}
                            <h2>About Community</h2>
                        </div>
                        <p>A community for {community ? community.name : 'Community Name'} discussion</p>


                        {user && (
                            <OpenModalButton
                                modalComponent={<CreateMediaForm />}
                                onItemClick={closeMenu}
                                className="create-post-button"
                                buttonText="Create Post"
                            >
                            </OpenModalButton>
                        )}
                        <div className='about-foot'>


                            <About />
                        </div>
                    </div>
                </div>
                <div className='community-rules'>
                    <h3>/{community ? community.name : 'Community Name'} rules</h3>
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
        </div>
    );
};

export default CommunityPosts;
