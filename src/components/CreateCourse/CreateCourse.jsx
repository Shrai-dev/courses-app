import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import './CreateCourse.css';
import calculateDuration from '../../helpers/calculateDuration';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import { v4 as uuidv4 } from 'uuid';

const CreateCourse = (props) => {
	const [newCourseAuthor, setNewCourseAuthor] = useState({
		id: '',
		name: '',
	});
	const [titleValue, setTitleValue] = useState('');
	const [descriptionValue, setDescriptionValue] = useState('');
	const [durationValue, setDurationValue] = useState('');
	const [authors, setAuthors] = useState([...mockedAuthorsList]);
	const [courseAuthorsList, setCourseAuthorsList] = useState([]);
	const [courseAuthorsIds, setCourseAuthorsIds] = useState([]);

	const course = {
		id: uuidv4(),
		title: titleValue,
		description: descriptionValue,
		creationDate: new Date().toLocaleDateString('en-US'),
		duration: durationValue,
		authors: courseAuthorsIds,
	};

	const handleSubmit = (event) => {
		event.preventDefault();
	};

	const createAuthor = () => {
		setAuthors((prev) => [...prev, newCourseAuthor]);
		mockedAuthorsList.push(newCourseAuthor);
	};

	const findAuthorName = (id) => {
		const author = mockedAuthorsList.filter((elem) => elem.id === id);
		return author[0].name;
	};

	const addAuthor = (id) => {
		setCourseAuthorsList((prev) => [
			...prev,
			{
				id: id,
				name: findAuthorName(id),
			},
		]);
		setCourseAuthorsIds((prev) => [...prev, id]);
		setAuthors(authors.filter((a) => a.id !== id));
	};

	const deleteAuthor = (id) => {
		setAuthors((prev) => [
			...prev,
			{
				id: id,
				name: findAuthorName(id),
			},
		]);
		setCourseAuthorsList(courseAuthorsList.filter((a) => a.id !== id));
		setCourseAuthorsIds(courseAuthorsIds.filter((elem) => elem !== id));
	};

	const createCourse = () => {
		if (
			course.title === '' ||
			course.description === '' ||
			course.duration === ''
		) {
			alert('Please, fill in all fields');
		} else {
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
					type='button'
					handleClick={() => deleteAuthor(elem.id)}
				/>
			</div>
		);
	});

	const authorList = authors.map((elem) => {
		return (
			<div className='author-item' key={'author' + elem.id}>
				<p className='author-name' id={elem.id}>
					{elem.name}
				</p>
				<Button
					className='addAuthor'
					buttonText='Add author'
					type='button'
					handleClick={() => addAuthor(elem.id)}
				/>
			</div>
		);
	});

	return (
		<form className='course__container' onSubmit={handleSubmit}>
			<div className='course__inner'>
				<Input
					className='course-title'
					labelText='Title'
					type='text'
					name='title'
					id='title'
					placeholderText='Enter title...'
					handleChange={(event) => setTitleValue(event.target.value)}
					required={true}
					value={titleValue}
				/>
				<Button
					className='createCourse'
					buttonText='Create course'
					type='submit'
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
					value={descriptionValue}
					onChange={(event) => setDescriptionValue(event.target.value)}
				></textarea>
			</label>
			<div className='course__wrapper'>
				<div className='course__info'>
					<h3 className='course__title'>Add author</h3>
					<Input
						className='author-input'
						labelText='Author name'
						type='text'
						name='author'
						id='author'
						placeholderText='Enter author name...'
						handleChange={(event) =>
							setNewCourseAuthor((prev) => ({
								...prev,
								id: uuidv4(),
								name: event.target.value,
							}))
						}
						minLength='2'
						required={false}
						value={newCourseAuthor.name}
					/>
					<Button
						className='createAuthor'
						buttonText='Create author'
						type='button'
						handleClick={createAuthor}
					/>
					<h3 className='course__title'>Duration</h3>
					<Input
						className='duration-input'
						labelText='Duration'
						type='number'
						name='duration'
						id='duration'
						placeholderText='Enter duration in minutes...'
						handleChange={(event) => setDurationValue(event.target.value)}
						required={true}
						value={durationValue}
					/>
					<p className='course__duration'>
						Duration: {calculateDuration(durationValue)} hours
					</p>
				</div>
				<div className='course__authors'>
					<h3 className='course__title'>Authors</h3>
					{authors.length ? (
						authorList
					) : (
						<p className='course__author'>Author list is empty</p>
					)}
					<h3 className='course__title'>Course authors</h3>
					{courseAuthorsList.length ? (
						courseAuthorList
					) : (
						<p className='course__author'>Author list is empty</p>
					)}
				</div>
			</div>
		</form>
	);
};

export default CreateCourse;
