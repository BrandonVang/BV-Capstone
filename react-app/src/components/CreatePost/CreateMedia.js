import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreatePost, fetchAllPosts, fetchPostByCommunity } from '../../store/post';
import { thunkAddMediaToPost } from '../../store/media';
import { useModal } from '../../context/Modal';
import "./CreatePostForm.css"
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const CreateMediaForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('');
    const [media_file, setMedia_file] = useState('');
    // const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()
    const [selectedCommunityId, setSelectedCommunityId] = useState('');
    const userCommunities = useSelector(state => state.communities.userCommunities);
    const allCommunities = useSelector(state => state.communities.allCommunity)
    const [validationErrors, setValidationErrors] = useState({
        selectedCommunityId: '',
        title: '',
        content: '',
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newErrors = { ...validationErrors };

        if (name === "selectedCommunityId" && value) {
            newErrors.selectedCommunityId = "";
        }
        if (name === "title" && value) {
            newErrors.title = "";
        }
        if (name === "content" && value.length >= 5 && value.length <= 2000) {
            newErrors.content = "";
        }

        setValidationErrors(newErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
        if (!selectedCommunityId) {
            errors.selectedCommunityId = 'Please select a community';
        }
        if (!title) {
            errors.title = 'Title field is required';
        } else if (title.length < 5 || title.length > 100)
            errors.title = "Title must be more than 5 characters and less than 100 "
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
                const createdPost = await dispatch(thunkCreatePost(postData));
                if (media_file) {
                    await dispatch(thunkAddMediaToPost(createdPost.id, media_file));
                }
                setContent('');
                setMedia_file('');
                setValidationErrors([]);
                closeModal();
                await dispatch(fetchAllPosts());
                await dispatch(fetchPostByCommunity(selectedCommunityId))
            } catch (error) {
                console.error("Error creating post:", error);
                // Handle error if needed
            }
        } else {
            setValidationErrors(errors);
        }
    };

    return (
        <div className='form-container'>
            <form className='create-post-form' onSubmit={handleSubmit} encType="multipart/form-data" >
                <div className='community-input'>
                    {validationErrors.selectedCommunityId && <p className="errors">{validationErrors.selectedCommunityId}</p>}
                    <select
                        className='Community-dropdown'
                        value={selectedCommunityId}
                        onChange={(e) => {
                            setSelectedCommunityId(e.target.value);
                            handleInputChange(e); // Call the function to remove the error message
                        }}
                        name="selectedCommunityId"
                    >
                        <option value=''>Select a community</option>
                        {Object.values(allCommunities).map(community => (
                            <option key={community.id} value={community.id}>
                                {community.name}
                            </option>
                        ))}
                    </select>
                </div>
                {validationErrors.title && <p className="errors">{validationErrors.title}</p>}
                <div className='title-input'>
                    <input
                        className='PostForm-title'
                        placeholder='Title'
                        type='text'
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            handleInputChange(e);
                        }}
                        name="title"
                    />

                </div>

                {validationErrors.content ? <p className="errors">{validationErrors.content}</p> : ''}
                <input className='PostForm-content'
                    placeholder='Whats on your mind?'
                    type='text'
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value);
                        handleInputChange(e);
                    }}
                    name="content"
                />
                <div className='media-input'>
                    {/* <label
                            className="Post-Media-input"
                            htmlFor='image'
                        >
                            Upload Images
                        </label> */}
                    <p>(Optional)</p>
                    <input
                        className='Post-Media-input'
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
export default CreateMediaForm
