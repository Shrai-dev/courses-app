import React, { ChangeEvent, FC, useState } from 'react';
import './Courses.css';
import '../../common/Button/Button.css';
import CourseCard from './components/CourseCard/CourseCard';
import { mockedCoursesList } from '../../constants';
import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import { Link } from 'react-router-dom';
import getAuthorName from '../../helpers/getAuthorName';

const Courses: FC = () => {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [searchValue, setSearchValue] = useState('');

	const getSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		if (event.target.value === '') {
			setCourses(mockedCoursesList);
		}
		let dataLowerCase = event.target.value.toLowerCase();
		setSearchValue(dataLowerCase);
	};

	const handleSearch = (searchTerm: string) => {
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
				id={course.id}
				title={course.title}
				description={course.description}
				authors={getAuthorName(course.authors)}
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
				<Link to='/courses/add'>
					<Button className='newCourse' buttonText='Add new course' />
				</Link>
			</div>
			{coursesElements}
		</div>
	);
};

export default Courses;
