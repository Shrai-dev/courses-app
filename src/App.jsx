import React, { useState } from 'react';
import './App.css';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header.jsx';

const App = () => {
	const [showCourseForm, setShowCourseForm] = useState(false);

	const createNewCourse = () => {
		setShowCourseForm(false);
	};

	const addNewCourse = () => {
		setShowCourseForm(true);
	};

	return (
		<div className='wrapper'>
			<Header />
			{showCourseForm ? (
				<CreateCourse handleClick={createNewCourse} />
			) : (
				<Courses handleClick={addNewCourse} />
			)}
		</div>
	);
}

export default App;

