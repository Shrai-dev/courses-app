import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../common/Button/Button';
import '../../../../common/Button/Button.css';
import './CourseCard.css';
import calculateDuration from '../../../../helpers/calculateDuration';
import formatDate from '../../../../helpers/formatDate';
import getAuthorName from '../../../../helpers/getAuthorName';

const CourseCard = (course) => {
	const navigate = useNavigate();

	const openCourse = (id) => {
		navigate(`/courses/${id}`);
	};

	return (
		<div className='card__container'>
			<div className='card__content'>
				<h2 className='card__title'>{course.course.title}</h2>
				<p className='card__description'>{course.course.description}</p>
			</div>
			<div className='card__details'>
				<p className='card__info card__author'>
					<strong>Authors: </strong> {getAuthorName(course.course.authors)}
				</p>
				<p className='card__info'>
					<strong>Duration: </strong>
					{calculateDuration(course.course.duration)} hours
				</p>
				<p className='card__info'>
					<strong>Created: </strong>
					{formatDate(course.course.creationDate)}
				</p>
				<Button
					handleClick={() => openCourse(course.course.id)}
					className='showCourse'
					buttonText='Show course'
					type='button'
				/>
			</div>
		</div>
	);
};

export default CourseCard;
