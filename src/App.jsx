import React, { useState } from 'react';
import './App.css';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header.jsx';

function App() {
	const [newCourseClicked, setNewCourseClicked] = useState(false);

	const handleCreateNewCourse = () => {
		setNewCourseClicked(false);
	};

	const handleAddNewCourse = () => {
		setNewCourseClicked(true);
	};

	return (
		<div className='wrapper'>
			<Header />
			{newCourseClicked ? (
				<CreateCourse handleClick={handleCreateNewCourse} />
			) : (
				<Courses handleClick={handleAddNewCourse} />
			)}
		</div>
	);
}

export default App;
