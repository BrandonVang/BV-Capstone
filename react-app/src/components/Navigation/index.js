import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/logo.jpg'
// import { fetchAllCommunities, fetchLoggiedInUserCommunities } from '../../store/community';
import DropdownMenu from './DropDownMenu';
import OpenModalButton from '../OpenModalButton';
import CreatePostForm from '../CreatePost/CreatePost';
import CreateMediaForm from '../CreatePost/CreateMedia';


function Navigation({ isLoaded }) {
	// const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const [searchInput, setSearchInput] = useState('');
	// const userCommunities = useSelector(state => state.communities.userCommunities);
	const [showMenu, setShowMenu] = useState(false);

	const handleReserveClick = () => {
		alert('Feature coming soon');
	};

	const handleSearchChange = (e) => {
		setSearchInput(e.target.value);
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
	const closeMenu = () => setShowMenu(false);

	return (
		<div className='nav-container'>

			<div className='nav1'>

				<NavLink className="home-logo" exact to="/">
					<img className="logo" src={logo} alt="Home" />
					<p className='logo-title'>Bluedit</p>
				</NavLink>

				{sessionUser &&
					<DropdownMenu />
				}

			</div>
			<form className="search-bar" onSubmit={handleReserveClick}>
				<input
					type="text"
					value={searchInput}
					onChange={handleSearchChange}
					placeholder="Search Bluedit"
					className='search-input'
				/>
				<button type="submit">Search</button>
			</form>


			{isLoaded && (
				<div className='nav'>
					{sessionUser && (
						<div className='icon-item'>

							<OpenModalButton
								modalComponent={<CreateMediaForm />}
								onItemClick={closeMenu}
								i className="fas fa-plus fa-lg"
							>
							</OpenModalButton>

						</div>
					)}
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
