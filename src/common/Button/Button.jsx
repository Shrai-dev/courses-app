import React from 'react';
import './Button.css';

const Button = (props) => {
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
