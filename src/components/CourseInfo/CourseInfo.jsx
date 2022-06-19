import React from 'react';
import './CourseInfo.css';
import { Link, useParams } from 'react-router-dom';
import getAuthorName from '../../helpers/getAuthorName';
import { mockedCoursesList } from '../../constants';
import formatDate from './../../helpers/formatDate';
import calculateDuration from '../../helpers/calculateDuration';

const CourseInfo = () => {
	const params = useParams();
	const courseData = mockedCoursesList.filter(
		(elem) => elem.id === params.courseId
	)[0];
	return (
		<section className='course__data'>
			<Link className='backward__link' to='/courses'>
				&lt; Back to courses
			</Link>
			<h2 className='course__data-title'>{courseData.title}</h2>
			<div className='course__data-inner'>
				<p className='course__data-description'>{courseData.description}</p>

				<div className='course__data-details'>
					<p className='course__data-text'>
						<strong>ID: </strong> {courseData.id}
					</p>
					<p className='course__data-text'>
						<strong>Duration: </strong>
						{calculateDuration(courseData.duration)} hours
					</p>
					<p className='course__data-text'>
						<strong>Created: </strong>
						{formatDate(courseData.creationDate)}
					</p>
					<p className='course__data-text'>
						<strong>Authors: </strong> {getAuthorName(courseData.authors)}
					</p>
				</div>
			</div>
		</section>
	);
};

export default CourseInfo;
