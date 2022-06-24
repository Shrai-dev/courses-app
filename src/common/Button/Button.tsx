import React, { FC } from 'react';
import './Button.css';

interface ButtonProps {
	className: string;
	handleClick?: any;
	type?: 'button' | 'submit';
	buttonText: string;
}

const Button: FC<ButtonProps> = (props) => {
	return (
		<button
			className={props.className}
			onClick={props.handleClick}
			type={props.type}
		>
			{props.buttonText}
		</button>
	);
};

export default Button;
