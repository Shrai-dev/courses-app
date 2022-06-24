import React, { ChangeEvent, FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import useForm from '../../hooks/useForm';
import './CreateCourse.css';
import calculateDuration from '../../helpers/calculateDuration';
import { validationRules } from '../../helpers/validationRules';
import { mockedCoursesList, mockedAuthorsList } from '../../constants';
import { v4 as uuidv4 } from 'uuid';

export interface ICourse {
	id: string;
	title: string;
	description: string;
	authors: string;
	duration: number;
	creationDate: string;
}

const CreateCourse: FC = () => {
	const { handleSubmit, handleChange, handleBlur, data, errors, touched } =
		useForm({
			validations: validationRules,
			onSubmit: () => createCourse(),
		});

	const [newCourseAuthor, setNewCourseAuthor] = useState({
		id: '',
		name: '',
	});
	const [authors, setAuthors] = useState([...mockedAuthorsList]);
	const [courseAuthorsList, setCourseAuthorsList] = useState([{}]);

	const course = {
		id: uuidv4(),
		title: data.title,
		description: data.description,
		creationDate: new Date().toLocaleDateString('en-US'),
		duration: data.duration,
		authors: [],
	};

	const navigate = useNavigate();

	const createAuthor = () => {
		if (newCourseAuthor.name.length < 2) {
			alert('The author name needs to be at least 2 characters long');
		} else {
			setAuthors((prev) => [...prev, newCourseAuthor]);
			mockedAuthorsList.push(newCourseAuthor);
		}
	};

	const findAuthorName = (id: string) => {
		const author = mockedAuthorsList.filter((elem) => elem.id === id);
		return author[0].name;
	};

	const addAuthor = (id: string) => {
		setCourseAuthorsList((prev) => [
			...prev,
			{
				id: id,
				name: findAuthorName(id),
			},
		]);
		setAuthors(authors.filter((a) => a.id !== id));
	};

	const deleteAuthor = (id: string) => {
		setAuthors((prev) => [
			...prev,
			{
				id: id,
				name: findAuthorName(id),
			},
		]);
		setCourseAuthorsList(courseAuthorsList.filter((a) => a.id !== id));
	};

	const createCourse = () => {
		course.authors = courseAuthorsList.map((elem) => elem.id);
		mockedCoursesList.push(course);
		navigate('/courses');
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
						handleBlur={handleBlur}
					/>
					{errors.title && touched.title && (
						<p className='form__error'>{errors.title}</p>
					)}
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
					minLength={2}
					required
					value={data.description}
					onChange={handleChange('description')}
					onBlur={handleBlur}
				></textarea>
				{errors.description && touched.description && (
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
						handleChange={(event: ChangeEvent<HTMLInputElement>) =>
							setNewCourseAuthor((prev) => ({
								...prev,
								id: uuidv4(),
								name: event.target.value,
							}))
						}
						minLength={2}
						required={false}
						value={newCourseAuthor.name}
						htmlFor='author'
						handleBlur={handleBlur}
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
						handleChange={handleChange('duration')}
						required={true}
						value={data.duration || ''}
						htmlFor='duration'
						handleBlur={handleBlur}
					/>
					{errors.duration && touched.duration && (
						<p className='form__error'>{errors.duration}</p>
					)}
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
