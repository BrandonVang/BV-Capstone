import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeletePostById } from '../../store/post';
import OpenModalMenuItem from './OpenModalMenuItem'
import DeleteConfirmModal from '../Delete';
import EditPostForm from '../CreatePost/EditPostForm';
import './PostIndex.css';

const PostIndexItem = ({ post, fromPath }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const getCurrentUser = (state) => state.session.user;
    const currentUser = useSelector(getCurrentUser);


    return (
        <div className='post-index-item-wrapper'>
            <div className="post-index-item">
                <div className='title-bar-container'>

                    <Link className='postItem-title-bar' to={`/posts/${post.id}`}>
                        <div className='post-user-follow'>
                            <span className='community'> /{post.community.name} </span>
                            <span className='title-bar-username'>Posted By {post.user.username} </span>
                        </div>
                    </Link>

                    <div className='post-index-item-menu'>
                        <div className='title-bar-follow-cont'>
                            <span className='title-bar-follow'>Join</span>
                        </div>
                        <svg className=""xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
                        </svg>
                        <div className="dropdown-content">

                            {currentUser && currentUser.id === post.user.id &&
                                (
                                    <div className='postitem-delete-edit-wrapper'>
                                        <OpenModalMenuItem
                                            itemType='delete_icon'
                                            itemText='Delete'
                                            modalComponent={<DeleteConfirmModal post={post} type='post' />}
                                        />
                                        <OpenModalMenuItem
                                            itemType='edit_icon'
                                            itemText="Update"
                                            modalComponent={<EditPostForm post={post} />}
                                            // onItemClick={closeMenu}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <Link to={`/posts/${post.id}`}>
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
            </div >
        </div>
    );
};

export default PostIndexItem;
