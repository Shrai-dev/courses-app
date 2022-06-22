import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

const App: FC = () => {
	return (
		<div className='wrapper'>
			<Header />
			<Routes>
				{localStorage.getItem('token') && (
					<Route path={'/' || '/courses'} element={<Courses />} />
				)}
				{!localStorage.getItem('token') && (
					<Route path={'/' || '/login'} element={<Login />} />
				)}
				<Route path='/registration' element={<Registration />} />
				<Route path='/courses' element={<Courses />} />
				<Route path='/courses/:courseId' element={<CourseInfo />} />
				<Route path='/courses/add' element={<CreateCourse />} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</div>
	);
};

export default App;
