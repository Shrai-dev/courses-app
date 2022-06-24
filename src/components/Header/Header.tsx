import React, { MouseEvent } from 'react';
import './Header.css';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
	const navigate = useNavigate();
	const handleLogout = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		localStorage.clear();
		localStorage.removeItem('token');
		localStorage.removeItem('name');
		navigate('/login');
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
