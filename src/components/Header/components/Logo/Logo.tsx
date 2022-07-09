import React, { FC } from 'react';
import './Logo.css';
import LogoImage from '../../../../assets/logo.png';

const Logo: FC = () => <img className='header__logo' src={LogoImage} alt='' />;

export default Logo;
