import React from 'react';
import './Input.css';

function Input(props) {
	return (
		<label htmlFor='searchInput'>
			{props.labelText}
			<input
				className={props.className}
				type={props.type}
				name='search'
				id='searchInput'
				placeholder={props.placeholderText}
				onChange={props.handleChange}
				minLength={props.minLength}
				required={props.required}
				value={props.value}
			/>
		</label>
	);
}

export default Input;
