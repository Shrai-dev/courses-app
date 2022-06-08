import React from 'react';
import './Input.css';

const Input = (props) => {
	return (
		<label htmlFor={props.id}>
			{props.labelText}
			<input
				className={props.className}
				type={props.type}
				name={props.name}
				id={props.id}
				placeholder={props.placeholderText}
				onChange={props.handleChange}
				minLength={props.minLength}
				required={props.required}
				value={props.value}
				onBlur={props.handleBlur}
			/>
		</label>
	);
};

export default Input;
