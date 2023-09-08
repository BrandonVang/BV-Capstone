import React, { useState, useEffect, useRef } from 'react';
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
    const dropdownRef = useRef(null);



    useEffect(() => {
        if (sessionUser) {
            dispatch(fetchLoggiedInUserCommunities());
        }

        const closeDropdown = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, [dispatch]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCommunityClick = () => {
        setIsOpen(false);
    };



    return (
        <div className="dropdown-menu" ref={dropdownRef}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                <i className='fa fa-home'></i>
                <p className='home-desc'> Home </p>
                <div className='down-arrow'>
                    <i className="fas fa-angle-down angle-icon"></i>
                </div>
            </button>
            {isOpen && userCommunities.length > 0 && (
                <ul className="dropdown-list">
                    {userCommunities.map(community => (
                        <div key={community.id}>
                            <Link to={`/posts/community/${community.id}`} onClick={handleCommunityClick}>{community.name}</Link>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
