import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCreateCommunity, fetchAllCommunities } from '../../store/community';
import { useModal } from '../../context/Modal';

const CreateCommunityForm = () => {
    const [name, setName] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const currentUser = useSelector((state) => state.posts.currentUser);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
        setName(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                name: 'Community name field is required',
            }));
            return;
        }
        if (name.length < 5 || name.length > 100) {
            setValidationErrors((prevErrors) => ({
                ...prevErrors,
                name: 'Community name must be between 5 and 100 characters',
            }));
            return;
        }

        const communityData = {
            name,
        };

        try {
            const community = await dispatch(fetchCreateCommunity(communityData));
            const communityId = community.id; // Get the community ID from the response
            setName(''); // Clear the 'name' field after submission
            setValidationErrors({});
            await dispatch(fetchAllCommunities());
            closeModal();
            history.push(`/posts/community/${communityId}`);
        } catch (error) {
            console.error('Error creating community:', error);
            // Handle error if needed
        }
    };

    return (
        <div className='form-container'>
            <form className='create-post-form' onSubmit={handleSubmit}>
                {validationErrors.name && <p className="errors">{validationErrors.name}</p>}
                <input
                    className='PostForm-content'
                    placeholder='Community Name'
                    type='text'
                    value={name}
                    onChange={handleInputChange}
                    name="name"
                />
                <div className='Create-Form-Submit-btn'>
                    <button className='Create-Post-Submit' type='submit'>Create Community</button>
                </div>
            </form>
        </div>
    )
}

export default CreateCommunityForm;
