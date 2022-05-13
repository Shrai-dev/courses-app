import React from 'react';
import './Input.css';

function Input(props) {
	return (
		<label htmlFor='searchInput'>
			{props.labelText}
			<input
				className='search-input'
				type='text'
				name='search'
				id='searchInput'
				placeholder={props.placeholderText}
				onChange={props.handleChange}
			/>
		</label>
	);
}

export default Input;
