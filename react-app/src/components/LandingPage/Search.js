import { useHistory } from 'react-router-dom';
import PostIndexItem from './indexitem';
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPosts, fetchFollowingPosts, getSearchPosts } from '../../store/post';
import { fetchUserLikes } from '../../store/like';
import About from '../About/Footer';
import { useEffect } from 'react';
import './PostIndex.css';
import { fetchLoggiedInUserCommunities } from '../../store/community';
import Person from "../../images/person.jpg"
import OpenModalButton from '../OpenModalButton';
import CreateMediaForm from '../CreatePost/CreateMedia';
import error from "../../images/error-search.png"

const Search = () => {
    const getCurrentUser = (state) => state.session.user;
    const currentUser = useSelector(getCurrentUser);
    const history = useHistory();
    const path = window.location.pathname;
    const allPosts = useSelector(getSearchPosts);
    const dispatch = useDispatch();
    const [displayOption, setDisplayOption] = useState("show_following");
    const [showMenu, setShowMenu] = useState(false);

    allPosts.sort((post1, post2) => {
        const a = new Date(post1.postDate);
        const b = new Date(post2.postDate);
        return b - a;
    });


    useEffect(() => {
        dispatch(fetchAllPosts());
        // dispatch(fetchSearchPosts());
        if (currentUser) {
            try {
                dispatch(fetchLoggiedInUserCommunities());
                dispatch(fetchFollowingPosts());
                dispatch(fetchUserLikes(currentUser.id));
            } catch (e) {
                return
            }
        }
    }, [dispatch, currentUser]);

    const closeMenu = () => setShowMenu(false);

    return (
        <div className='home-wrapper'>
            <div className='posts_option_tab'>

            </div>

            {allPosts.length > 0 ? (
                <div className='post-index-all'>
                    {allPosts.map((post, index) => (
                        <PostIndexItem
                            post={post}
                            key={index}
                        />
                    ))}
                </div>
            ) : (
                <div className='no-results'>
                    <img src={error} alt="No results found" className='error-avatar' />
                    <p>Hm... we couldn’t find any results</p>
                </div>
            )}


            <div className='post-sidebar'>
                <div className='l-descri'>
                    <div className="person-logo-and-heading">
                        <img className="person-logo" src={Person} alt="Person Logo" />
                        <h2>Home</h2>
                    </div>
                    <p>Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>

                    {currentUser && (
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
        </div>
    );
};

export default Search;
