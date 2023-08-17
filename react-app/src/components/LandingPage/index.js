import { useHistory } from 'react-router-dom';
import PostIndexItem from './indexitem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPosts } from '../../store/post';
import { useEffect, useState } from 'react';
import Person from "../../images/person.jpg"
import OpenModalButton from '../OpenModalButton';
import CreateMediaForm from '../CreatePost/CreateMedia';
import './PostIndex.css';
import { fetchAllCommunities } from '../../store/community';

const getPost = (state) => Object.values(state.posts.allPosts);

const PostIndex = () => {
    const getCurrentUser = (state) => state.session.user;
    const user = useSelector(getCurrentUser);
    const history = useHistory();
    const path = window.location.pathname;
    const posts = useSelector(getPost);
    // const currentSpots = posts.filter(post => post.user.id === user.id);
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);



    posts.sort((post1, post2) => {
        const a = new Date(post1.postDate);
        const b = new Date(post2.postDate);
        return b - a;
    });


    useEffect(() => {
        dispatch(fetchAllPosts());
        dispatch(fetchAllCommunities())
    }, [dispatch]);

    const closeMenu = () => setShowMenu(false);

    return (
        <div className='home-wrapper'>
            <div className='post-index-all'>
                {posts.map((post, index) => (
                    <PostIndexItem
                        post={post}
                        key={index}
                    />
                ))}
            </div>


            <div className='post-sidebar'>
                <div className='l-descri'>
                    <div className="person-logo-and-heading">
                        <img className="person-logo" src={Person} alt="Person Logo" />
                        <h2>Home</h2>
                    </div>
                    <p>Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>

                    {user && (
                        <OpenModalButton
                            modalComponent={<CreateMediaForm />}
                            onItemClick={closeMenu}
                            className="create-post-button"
                            buttonText="Create Post"
                        >
                        </OpenModalButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostIndex;
