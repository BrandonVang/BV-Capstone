import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './DropdownMenu.css';

const DropdownMenu = ({ userCommunities }) => {
    const [isOpen, setIsOpen] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown-menu">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                <i className='fa fa-home'></i>
                Home
                <div className='down-arrow'>
                    <i className="fas fa-angle-down angle-icon"></i>
                </div>
            </button>
            {isOpen && (
                <ul className="dropdown-list">
                    {userCommunities.map(community => (
                        <div key={community.id}>
                            <a href={`/community/${community.id}`}>{community.name}</a>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;
