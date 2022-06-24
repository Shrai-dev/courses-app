import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../common/Button/Button';
import '../../../../common/Button/Button.css';
import './CourseCard.css';
import calculateDuration from '../../../../helpers/calculateDuration';
import formatDate from '../../../../helpers/formatDate';
import { ICourse } from '../../../CreateCourse/CreateCourse';

const CourseCard: FC<ICourse> = (props) => {
	const navigate = useNavigate();

	const openCourse = (id: string) => {
		navigate(`/courses/${id}`);
	};

	return (
		<div className='card__container'>
			<div className='card__content'>
				<h2 className='card__title'>{props.title}</h2>
				<p className='card__description'>{props.description}</p>
			</div>
			<div className='card__details'>
				<p className='card__info card__author'>
					<strong>Authors: </strong> {props.authors}
				</p>
				<p className='card__info'>
					<strong>Duration: </strong>
					{calculateDuration(props.duration)} hours
				</p>
				<p className='card__info'>
					<strong>Created: </strong>
					{formatDate(props.creationDate)}
				</p>
				<Button
					handleClick={() => openCourse(props.id)}
					className='showCourse'
					buttonText='Show course'
					type='button'
				/>
			</div>
		</div>
	);
};

export default CourseCard;
