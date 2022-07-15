import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Registration from './components/Registration/Registration';

const App: FC = () => {
	return (
		<div className='wrapper'>
			<Header />
			<Routes>
				<Route path='/' element={<PrivateRoute />}>
					<Route path='/' element={<Courses />}>
						<Route path='courses' element={<Courses />} />
						<Route path='courses/:courseId' element={<CourseInfo />} />
						<Route path='courses/add' element={<CreateCourse />} />
					</Route>
				</Route>

				<Route path='/login' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
			</Routes>
		</div>
	);
};

export default App;
