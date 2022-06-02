import React from 'react';
import './Header.css';
import Logo from './components/Logo/Logo.jsx';
import Button from '../../common/Button/Button';

const Header = () => {
	return (
		<header className='header'>
			<Logo />
			<div className='header__content'>
				<h4 className='header__user'>Stacey</h4>
				<Button className='login' buttonText='Logout' />
			</div>
		</header>
	);
};

export default Header;
