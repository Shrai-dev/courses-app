import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import './Login.css';
import axios from '../../api/axios';

const LOGIN_URL = '/login';

const Login = () => {
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		setErrMsg('');
	}, [email, password]);

	const handleLogin = (e) => {
		e.preventDefault();
		axios
			.post(
				LOGIN_URL,
				{ email: email, password: password },
				{
					headers: {
						'Content-Type': 'application/json',
						withCredentials: true,
					},
				}
			)
			.then((response) => {
				localStorage.setItem('token', response.data.result);
				localStorage.setItem('name', response.data.user.name);
				setSuccess(true);
				setPassword('');
				setEmail('');
			})
			.catch((error) => {
				setSuccess(false);
				if (!error?.response) {
					setErrMsg('No Server Response');
				} else if (error.response?.status === 400) {
					setErrMsg('Missing Email or Password');
				} else if (error.response?.status === 401) {
					setErrMsg('Unauthorized');
				} else {
					setErrMsg('Login Failed');
				}
			});
	};
	return (
		<>
			{success ? (
				<Navigate to='/courses' />
			) : (
				<section className='login'>
					<h1 className='login__title'>Login</h1>
					<p className='error'>{errMsg}</p>
					<form className='login__form' onSubmit={handleLogin}>
						<Input
							className='login-input'
							labelText='Email'
							type='email'
							name='email'
							id='email'
							placeholderText='Enter email...'
							handleChange={(event) => setEmail(event.target.value)}
							required={true}
							value={email}
							htmlFor='email'
						/>
						<Input
							className='login-input'
							labelText='Password'
							type='password'
							name='password'
							id='password'
							placeholderText='Enter password...'
							handleChange={(event) => setPassword(event.target.value)}
							required={true}
							value={password}
							htmlFor='password'
						/>
						<Button className='login-user' buttonText='Login' type='submit' />
					</form>
					<p className='login__disclaimer'>
						If you do not have an account you can{' '}
						<Link to='/registration'>register</Link>
					</p>
				</section>
			)}
		</>
	);
};

export default Login;
