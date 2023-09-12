import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreatePost, fetchAllPosts } from '../../store/post';
import { useModal } from '../../context/Modal';
import OpenModalButton from "../OpenModalButton";
import "./CreatePostForm.css"
const CreatePostForm = () => {
    const [content, setContent] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal()
    const currentUser = useSelector((state) => state.posts.currentUser);

    const handleSubmit = async (e) => {
        e.preventDefault()
        let errors = {}
        if (!content) errors.content = 'Content field is required'
        if (content.length < 5 || content.length > 2000) errors.content = 'Content text must be more than 5 characters and less than 2000'
        if (Object.keys(errors).length === 0) {
            const formData = new FormData()
            formData.append("content", content);
            await dispatch(thunkCreatePost(formData))
            setContent('');
            setValidationErrors([]);
            await dispatch(fetchAllPosts())
            // history.push('/')
            closeModal()

        } else {
            setValidationErrors(errors);
        }
    }

    // useEffect(() => {
    //     const errors = [];
    //     if (!content.length) errors.push('Content field is required');
    //     if (content.length < 5 || content.length > 2000) errors.content = 'Content text must be more than 5 characters and less than 2000'
    //     setValidationErrors(errors);
    // }, [content])
    return (
        <div className='form-container'>
            <form className='create-post-form' onSubmit={handleSubmit}>
                {validationErrors.content ? <p className="errors">{validationErrors.content}</p> : ''}
                <input className='PostForm-content'
                    placeholder='Whats on your mind?'
                    type='text'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className='Create-Form-Submit-btn'>
                    <button className='Create-Post-Submit' type='submit'>Submit</button>
                </div>
            </form>
        </div>

    )
}
export default CreatePostForm
