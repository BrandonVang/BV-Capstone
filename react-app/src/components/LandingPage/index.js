import { useHistory } from 'react-router-dom';
import PostIndexItem from './indexitem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllPosts } from '../../store/post';
import { useEffect } from 'react';
import './PostIndex.css';

const getPost = (state) => Object.values(state.posts.allPosts);

const PostIndex = () => {
    const getCurrentUser = (state) => state.session.user;
    const user = useSelector(getCurrentUser);
    const history = useHistory();
    const path = window.location.pathname;
    const posts = useSelector(getPost);
    // const currentSpots = posts.filter(post => post.user.id === user.id);
    const dispatch = useDispatch();


    posts.sort((post1, post2) => {
        const a = new Date(post1.postDate);
        const b = new Date(post2.postDate);
        return b - a;
    });


    useEffect(() => {
        dispatch(fetchAllPosts());
    }, [dispatch]);

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
        </div>
    );
};

export default PostIndex;
