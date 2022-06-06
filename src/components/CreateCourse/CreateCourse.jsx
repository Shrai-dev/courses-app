import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import useForm from '../../hooks/useForm';
import './CreateCourse.css';
import calculateDuration from '../../helpers/calculateDuration';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import { v4 as uuidv4 } from 'uuid';

const CreateCourse = (props) => {
	const { handleSubmit, handleChange, data, errors } = useForm({
		validations: {
			title: {
				required: {
					value: true,
					message: 'The title is required',
				},
			},
			description: {
				custom: {
					isValid: (value) => {
						if (!value) return false;
						return value.length < 2 ? false : true;
					},
					message: 'The description needs to be at least 2 characters long',
				},
			},
			duration: {
				custom: {
					isValid: (value) => parseInt(value, 10) > 0,
					message: 'The duration needs to be more than 0',
				},
			},
		},
		onSubmit: () => createCourse(),
	});

	const [newCourseAuthor, setNewCourseAuthor] = useState({
		id: '',
		name: '',
	});
	const [authors, setAuthors] = useState([...mockedAuthorsList]);
	const [courseAuthorsList, setCourseAuthorsList] = useState([]);
	const [courseAuthorsIds, setCourseAuthorsIds] = useState([]);

	const course = {
		id: uuidv4(),
		title: data.title,
		description: data.description,
		creationDate: new Date().toLocaleDateString('en-US'),
		duration: data.duration,
		authors: courseAuthorsIds,
	};

	const createAuthor = () => {
		if (newCourseAuthor.name.length < 2) {
			alert('The author name needs to be at least 2 characters long');
		} else {
			setAuthors((prev) => [...prev, newCourseAuthor]);
			mockedAuthorsList.push(newCourseAuthor);
		}
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
		mockedCoursesList.push(course);
		props.handleClick();
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
		<form className='course__container'>
			<div className='course__inner'>
				<div className='course__inner-title'>
					<Input
						className='course-title'
						labelText='Title'
						type='text'
						name='title'
						id='title'
						placeholderText='Enter title...'
						handleChange={handleChange('title')}
						required={true}
						value={data.title || ''}
						htmlFor='title'
					/>
					{errors.title && <p className='form__error'>{errors.title}</p>}
				</div>
				<Button
					className='createCourse'
					buttonText='Create course'
					type='submit'
					handleClick={handleSubmit}
				/>
			</div>
			<label className='course__description-label' htmlFor='description'>
				Description
				<textarea
					className='course__description'
					name='description'
					id='description'
					placeholder='Enter description'
					cols='30'
					rows='8'
					minLength='2'
					required
					value={data.description}
					onChange={handleChange('description')}
				></textarea>
				{errors.description && (
					<p className='form__error'>{errors.description}</p>
				)}
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
						htmlFor='author'
					/>
					{errors.author && <p className='form__error'>{errors.author}</p>}
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
						handleChange={handleChange('duration')}
						required={true}
						value={data.duration || ''}
						htmlFor='duration'
					/>
					{errors.duration && <p className='form__error'>{errors.duration}</p>}
					<p className='course__duration'>
						Duration: {calculateDuration(data.duration)} hours
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
