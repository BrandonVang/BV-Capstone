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

                    <div className="landing-detail-vote">
                        <i className="fa fa-arrow-up" aria-hidden="true"></i>
                        <p className="detail-count">{post.likes_count}</p>
                        <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    </div>

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

            </div >


        </div>
    );
};

export default PostIndexItem;
