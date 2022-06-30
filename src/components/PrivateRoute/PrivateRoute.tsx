import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = (): boolean => {
	return localStorage.getItem('name') ? true : false;
};

const PrivateRoute: FC = () => {
	const auth = useAuth();

	return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
