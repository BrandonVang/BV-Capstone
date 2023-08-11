import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import logo from '../../images/logo.jpg'
import { fetchAllCommunities, fetchLoggiedInUserCommunities } from '../../store/community';
import DropdownMenu from './DropDownMenu';


function Navigation({ isLoaded}){
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const [searchInput, setSearchInput] = useState('');
	const userCommunities = useSelector(state => state.communities.userCommunities);

	useEffect(() => {
		dispatch(fetchLoggiedInUserCommunities());
	}, [dispatch]);


	const handleReserveClick = () => {
		alert('Feature coming soon');
	};

	const handleSearchChange = (e) => {
		setSearchInput(e.target.value);
	};

	return (
		<div className='nav-container'>

			<div className='nav1'>

				<NavLink className="home-logo" exact to="/">
					<img className="logo" src={logo} alt="Home" />
					<p className='logo-title'>Bluedit</p>
				</NavLink>

				{sessionUser &&
				<DropdownMenu userCommunities={userCommunities} />
				}

			</div>
				<form className="search-bar" onSubmit={handleReserveClick}>
					<input
						type="text"
						value={searchInput}
						onChange={handleSearchChange}
						placeholder="Search Tumblr"
					/>
					<button type="submit">Search</button>
				</form>

			{isLoaded && (
				<div className='nav'>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
