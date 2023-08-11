import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkDeletePostById } from '../../store/post';
import './PostIndex.css';

const PostIndexItem = ({ post, fromPath }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <div className='post-index-item-wrapper'>
            <div className="post-index-item">
                <Link className='postItem-title-bar' to={`/posts/${post.id}`}>
                    <div className='post-user-follow'>
                        <span className='community'> /{post.community.name} </span>
                        <span className='title-bar-username'>Posted By {post.user.username} </span>
                        <span className='title-bar-follow'>Join</span>
                    </div>

                    <div className='post-index-item-menu'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" /></svg>
                    </div>
                </Link>

                <div className='post-title'>
                    <h2>{post.title}</h2>
                </div>

                <div className=''>
                    <div className='postItem-img-wrapper'>
                        {post.medias.map((item, index) => (
                            <div className='postItem-img' key={index}>
                                <img alt='house' src={`${item.media_url}`} />
                            </div>
                        ))}
                    </div>
                    <div>
                        <p>{post.content}</p>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default PostIndexItem;
