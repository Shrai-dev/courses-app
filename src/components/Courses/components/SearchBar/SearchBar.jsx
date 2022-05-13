import React from 'react';
import './SearchBar.css';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

function SearchBar(props) {
	return (
		<div className='search__wrapper'>
			<Input
				handleChange={props.handleInput}
				placeholderText='Enter course name...'
			/>
			<Button
				className='search'
				buttonText='Search'
				handleClick={props.doSearch}
			/>
		</div>
	);
}

export default SearchBar;
