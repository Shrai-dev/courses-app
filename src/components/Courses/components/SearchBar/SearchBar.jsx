import React from 'react';
import './SearchBar.css';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

const SearchBar = (props) => {
	return (
		<form onSubmit={(e) => e.preventDefault()} className='search__wrapper'>
			<Input
				className='search-input'
				name='search'
				id='search'
				type='text'
				handleChange={props.handleInput}
				placeholderText='Enter course name...'
			/>
			<Button
				className='search'
				buttonText='Search'
				handleClick={props.doSearch}
			/>
		</form>
	);
};

export default SearchBar;
