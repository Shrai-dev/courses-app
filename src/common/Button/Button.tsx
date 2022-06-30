import React, { FC, MouseEvent, FormEvent } from 'react';
import './Button.css';

interface IButtonProps {
	className: string;
	handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	type?: 'button' | 'submit';
	buttonText: string;
}

const Button: FC<IButtonProps> = (props) => {
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
