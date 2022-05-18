import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import './CreateCourse.css';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import { v4 as uuidv4 } from 'uuid';

function CreateCourse(props) {
	const [newAuthor, setNewAuthor] = useState({
		id: '',
		name: '',
	});
	const [courseAuthorsList, setCourseAuthorsList] = useState([]);
	const [course, setCourse] = useState({
		id: uuidv4(),
		title: '',
		description: '',
		creationDate: new Date().toLocaleDateString('en-US'),
		duration: '',
		authors: [],
	});

	const createAuthor = (event) => {
		event.preventDefault();
		mockedAuthorsList.push(newAuthor);
	};

	const addAuthor = (event) => {
		event.preventDefault();
		let author = event.currentTarget.parentNode.firstChild;
		setCourse((prev) => ({
			...prev,
			authors: [author.id],
		}));
		setCourseAuthorsList((prev) => [
			...prev,
			{
				id: author.id,
				name: author.innerText,
			},
		]);
	};

	const deleteAuthor = (event) => {
		event.preventDefault();
		let author = event.currentTarget.parentNode.firstChild;
		setCourse(course.author.filter((a) => a.id !== author.id));
		setCourseAuthorsList(courseAuthorsList.filter((a) => a.id !== author.id));
	};

	const createAuthorName = (event) => {
		let name = event.target.value;
		setNewAuthor((prev) => ({
			...prev,
			id: uuidv4(),
			name: name,
		}));
	};

	const getDurationValue = (event) => {
		let data = event.target.value;
		setCourse((prev) => ({
			...prev,
			duration: data,
		}));
	};

	const calculateDuration = (value) => {
		let hours = Math.floor(value / 60);
		let minutes = value % 60;
		if (hours < 10) {
			hours = `0${hours}`;
		}
		if (minutes < 10) {
			minutes = `0${minutes}`;
		}
		return `${hours}:${minutes}`;
	};

	const createCourse = (event) => {
		event.preventDefault();
		if (
			course.title === '' ||
			course.description === '' ||
			course.duration === ''
		) {
			alert('Please, fill in all fields');
		} else {
			setCourse({
				id: uuidv4(),
				title: '',
				description: '',
				creationDate: new Date().toLocaleDateString('en-US'),
				duration: '',
				authors: [],
			});
			mockedCoursesList.push(course);
			props.handleClick();
		}
	};

	const courseAuthorList = courseAuthorsList.map((elem) => {
		return (
			<div className='author-item' key={'author' + elem.id}>
				<p className='author-name' id={elem.id}>
					{elem.name}
				</p>
				<Button
					className='deleteAuthor'
					buttonText='Delete author'
					handleClick={deleteAuthor}
				/>
			</div>
		);
	});

	const authorList = mockedAuthorsList.map((elem) => {
		return (
			<div className='author-item' key={'author' + elem.id}>
				<p className='author-name' id={elem.id}>
					{elem.name}
				</p>
				<Button
					className='addAuthor'
					buttonText='Add author'
					handleClick={addAuthor}
				/>
			</div>
		);
	});

	return (
		<form className='course__container'>
			<div className='course__inner'>
				<Input
					className='course-title'
					labelText='Title'
					type='text'
					placeholderText='Enter title...'
					handleChange={(event) =>
						setCourse({ ...course, title: event.target.value })
					}
					required={true}
					value={course.title}
				/>
				<Button
					className='createCourse'
					buttonText='Create course'
					handleClick={createCourse}
				/>
			</div>
			<label className='course__description-label' htmlFor='description'>
				Description
				<textarea
					className='course__description'
					name='Description'
					id='description'
					placeholder='Enter description'
					cols='30'
					rows='8'
					minLength='2'
					required
					value={course.description}
					onChange={(event) =>
						setCourse({ ...course, description: event.target.value })
					}
				></textarea>
			</label>
			<div className='course__wrapper'>
				<div className='course__info'>
					<h3 className='course__title'>Add author</h3>
					<Input
						className='author-input'
						labelText='Author name'
						type='text'
						placeholderText='Enter author name...'
						handleChange={createAuthorName}
						minLength='2'
						required={false}
						value={newAuthor.name}
					/>
					<Button
						className='createAuthor'
						buttonText='Create author'
						handleClick={createAuthor}
					/>
					<h3 className='course__title'>Duration</h3>
					<Input
						className='duration-input'
						labelText='Duration'
						type='number'
						placeholderText='Enter duration in minutes...'
						handleChange={getDurationValue}
						required={true}
						value={course.duration}
					/>
					<p className='course__duration'>
						Duration: {calculateDuration(course.duration)} hours
					</p>
				</div>
				<div className='course__authors'>
					<h3 className='course__title'>Authors</h3>
					{authorList}
					<h3 className='course__title'>Course authors</h3>
					{course.authors.length ? (
						courseAuthorList
					) : (
						<p className='course__author'>Author list is empty</p>
					)}
				</div>
			</div>
		</form>
	);
}

export default CreateCourse;
