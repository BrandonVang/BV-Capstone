import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fetchAllCommunities, fetchLoggiedInUserCommunities } from '../../store/community';
import FilterPosts from '../FilterPost/FilterPost';
import './DropdownMenu.css';
import CommunityPosts from '../FilterPost/FilterPost';

const DropdownMenu = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const userCommunities = useSelector(state => state.communities.userCommunities);


    useEffect(() => {
        if (sessionUser) {
            dispatch(fetchLoggiedInUserCommunities());
        }
    }, [dispatch]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown-menu">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                <i className='fa fa-home'></i>
                <p className='home-desc'> Home </p>
                <div className='down-arrow'>
                    <i className="fas fa-angle-down angle-icon"></i>
                </div>
            </button>
            {isOpen && (
                <ul className="dropdown-list">
                    {userCommunities.map(community => (
                        <div key={community.id}>
                            <Link to={`/posts/community/${community.id}`}>{community.name}</Link>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
