import React from 'react';
import './Button.css';

function Button(props) {
	return (
		<button className={props.className} onClick={props.handleClick}>
			{props.buttonText}
		</button>
	);
}

export default Button;
