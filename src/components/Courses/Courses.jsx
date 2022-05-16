import React, { useState } from 'react';
import './Courses.css';
import '../../common/Button/Button.css';
import CourseCard from './components/CourseCard/CourseCard.jsx';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

function Courses() {
	const [items, setItems] = useState(mockedCoursesList);
	const [inputValue, setInputValue] = useState('');

	const getInputValue = (event) => {
		let dataLowerCase = event.target.value.toLowerCase();
		setInputValue(dataLowerCase);
	};

	const handleSearch = (searchTerm) => {
		const searchString = new RegExp(searchTerm, 'ig');
		let searchData = [...mockedCoursesList];
		const filteredList = searchData.filter((item) => {
			if (searchTerm === '') {
				return item;
			}
			return item.id.match(searchString) || item.title.match(searchString);
		});
		setItems(filteredList);
	};
	const getAuthorName = (array) => {
		let authorsArr = [];
		for (let i = 0; i < mockedAuthorsList.length; i++) {
			for (let j = 0; j < array.length; j++) {
				if (array[j] === mockedAuthorsList[i]['id']) {
					authorsArr.push(mockedAuthorsList[i]['name']);
				}
			}
		}
		return authorsArr.join(', ');
	};
	const coursesElements = items.map((course) => {
		return (
			<CourseCard
				key={course.id}
				title={course.title}
				description={course.description}
				author={getAuthorName(course.authors)}
				duration={course.duration}
				creationDate={course.creationDate}
			/>
		);
	});

	return (
		<div className='courses__wrapper'>
			<div className='courses__form'>
				<SearchBar
					doSearch={() => handleSearch(inputValue)}
					handleInput={getInputValue}
				/>
				<Button className='newCourse' buttonText='Add new course' />
			</div>
			{coursesElements}
		</div>
	);
}

export default Courses;
