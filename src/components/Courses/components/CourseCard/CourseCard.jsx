import React from 'react';
import Button from '../../../../common/Button/Button';
import '../../../../common/Button/Button.css';
import './CourseCard.css';
import calculateDuration from '../../../../helpers/calculateDuration';

const CourseCard = (props) => {
	return (
		<div className='card__container'>
			<div className='card__content'>
				<h2 className='card__title'>{props.title}</h2>
				<p className='card__description'>{props.description}</p>
			</div>
			<div className='card__details'>
				<p className='card__info card__author'>
					<strong>Authors: </strong> {props.author}
				</p>
				<p className='card__info'>
					<strong>Duration: </strong>
					{calculateDuration(props.duration)} hours
				</p>
				<p className='card__info'>
					<strong>Created: </strong>
					{props.creationDate}
				</p>
				<Button className='showCourse' buttonText='Show course' />
			</div>
		</div>
	);
};

export default CourseCard;
