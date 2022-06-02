import React, { useState } from 'react';
import './Courses.css';
import '../../common/Button/Button.css';
import getAuthorName from '../../helpers/getAuthorName';
import CourseCard from './components/CourseCard/CourseCard.jsx';
import { mockedCoursesList } from '../../constants';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';

const Courses = (props) => {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [searchValue, setSearchValue] = useState('');

	const getSearchValue = (event) => {
		event.preventDefault();
		if (event.target.value === '') {
			setCourses(mockedCoursesList);
		}
		let dataLowerCase = event.target.value.toLowerCase();
		setSearchValue(dataLowerCase);
	};

	const handleSearch = (searchTerm) => {
		const searchString = new RegExp(searchTerm, 'ig');
		const filteredList = mockedCoursesList.filter((item) => {
			if (searchTerm === '') {
				return item;
			}
			return item.id.match(searchString) || item.title.match(searchString);
		});
		setCourses(filteredList);
	};

	const coursesElements = courses.map((course) => {
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
					doSearch={() => handleSearch(searchValue)}
					handleInput={getSearchValue}
				/>
				<Button
					className='newCourse'
					buttonText='Add new course'
					handleClick={props.handleClick}
				/>
			</div>
			{coursesElements}
		</div>
	);
};

export default Courses;
