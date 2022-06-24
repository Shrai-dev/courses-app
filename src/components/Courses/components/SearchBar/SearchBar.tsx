import React, { FC } from 'react';
import './SearchBar.css';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

const SearchBar: FC = (props) => {
	return (
		<form onSubmit={(e) => e.preventDefault()} className='search__wrapper'>
			<Input
				className='search-input'
				name='search'
				id='search'
				type='text'
				handleChange={props.handleInput}
				placeholderText='Enter course name...'
				htmlFor='search'
			/>
			<Button
				className='search'
				buttonText='Search'
				type='submit'
				handleClick={props.doSearch}
			/>
		</form>
	);
};

export default SearchBar;
