import React, { MouseEvent } from 'react';
import './Header.css';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
// import axios from '../../api/axios';

// const LOGOUT_URL = '/logout';

const Header = () => {
	const navigate = useNavigate();
	const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		localStorage.clear();
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		navigate('/login');
		// axios
		// 	.delete(LOGOUT_URL, {
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			Authorization: `${localStorage.getItem('token')}`,
		// 		},
		// 	})
		// 	.then(() => {
		// 		localStorage.clear();
		// 		localStorage.removeItem('token');
		// 		localStorage.removeItem('name');
		// 		navigate('/login');
		// 	})
		// 	.catch((error) => {
		// 		alert(`${error.message}`);
		// 	});
	};

	return (
		<header className='header'>
			<Logo />
			<div className='header__content'>
				{localStorage.getItem('token') && localStorage.getItem('name') ? (
					<>
						<h4 className='header__user'>{localStorage.getItem('name')}</h4>
						<Button
							className='login-btn'
							buttonText='Logout'
							handleClick={handleLogout}
						/>
					</>
				) : (
					''
				)}
			</div>
		</header>
	);
};

export default Header;
