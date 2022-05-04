import React from 'react';
import './Logo.css';
import LogoImage from '../../../../assets/logo.png';

export default function Logo() {
	return <img className='header__logo' src={LogoImage} alt='' />;
}
