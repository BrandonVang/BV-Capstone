import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts, thunkEditPost, fetchFollowingPosts, fetchPostById } from '../../store/post';
import { thunkAddMediaToPost, thunkDeleteMedia, thunkCreatePost } from '../../store/media';
import { useModal } from '../../context/Modal';
import DeleteIcon from '../Icons/DeleteIcon';
import "./CreatePostForm.css"



const EditPostForm = ({ post }) => {
    const [title, setTitle] = useState(post.title); // Set the initial title
    const [selectedCommunityId, setSelectedCommunityId] = useState(post.community.id); // Set the initial community id
    const userCommunities = useSelector(state => state.communities.userCommunities);

    const [content, setContent] = useState(post.content);
    const [media_file, setMedia_file] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()
    const [post1, setPost1] = useState(post);

    const handleMediaDelete = async (mediaId) => {
        await dispatch(thunkDeleteMedia(mediaId));
        await dispatch(fetchFollowingPosts())
        await dispatch(fetchAllPosts());
        const post2 = await dispatch(fetchPostById(post.id));
        setPost1(post2);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
        if (!selectedCommunityId) {
            errors.selectedCommunityId = 'Please select a community';
        }
        if (!title) {
            errors.title = 'Title field is required';
        }
        if (!content) {
            errors.content = 'Content field is required';
        } else if (content.length < 5 || content.length > 2000) {
            errors.content = 'Content text must be more than 5 characters and less than 2000';
        }
        if (Object.keys(errors).length === 0) {
            const postData = {
                community_id: selectedCommunityId,
                title,
                content,
            };

            try {
                await dispatch(thunkEditPost(post.id, postData));

                if (media_file) {
                    await dispatch(thunkAddMediaToPost(post.id, media_file));
                }
                setContent('');
                setMedia_file('');
                setValidationErrors([]);
                await dispatch(fetchAllPosts());
                closeModal();
            } catch (error) {
                console.error("Error creating post:", error);
                // Handle error if needed
            }
        } else {
            setValidationErrors(errors);
        }
    };

    // useEffect(() => {
    //     const errors = [];
    //     if (!content.length) errors.push("Content field is required");
    //     setValidationErrors(errors);
    // }, [content])

    return (
        <div className='form-container'>


            <form className='create-post-form' onSubmit={handleSubmit} encType="multipart/form-data" >
                <div className='community-input'>
                    <select
                        className='Community-dropdown'
                        value={selectedCommunityId}
                        onChange={(e) => setSelectedCommunityId(e.target.value)}
                        >
                        <option value=''>Select a community</option>
                        {userCommunities.map(community => (
                            <option key={community.id} value={community.id}>
                                {community.name}
                            </option>
                        ))}
                    </select>
                    {validationErrors.selectedCommunityId && <p className="errors">{validationErrors.selectedCommunityId}</p>}
                </div>
                <div className='title-input'>
                    <input
                        className='PostForm-title'
                        placeholder='Title'
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {validationErrors.title && <p className="errors">{validationErrors.title}</p>}
                </div>


                {validationErrors.content ? <p className="errors">{validationErrors.content}</p> : ''}
                <input className='PostForm-content'
                    placeholder='Whats on your mind?'
                    type='text'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    />
                    {
                        post1.medias.map((media, index) => (
                            <div className='media-list' key={media.id}>
                                <div className='media-counts'>Media of index {index}</div>
                                <DeleteIcon onClick={() => handleMediaDelete(media.id)}/>
                            </div>
                        ))
                    }
                <div className='media-input'>
                    {/* <label
                        className="Post-Media-input"
                        htmlFor='image'
                        >
                        Upload Images
                    </label> */}
                    <input
                        id="image"
                        type="file"
                        accept="image/*, .mp4"
                        onChange={(e) => setMedia_file(e.target.files[0])}
                    >
                    </input>
                </div>
                <div className='Create-Form-Submit-btn'>
                    <button className='Create-Post-Submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}
export default EditPostForm
