import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import './Registration.css';
import axios from '../../api/axios';
import { Link, Navigate } from 'react-router-dom';

const REGISTER_URL = '/register';

export interface IUser {
	name?: string;
	email: string;
	password: string;
}

const Registration: FC = () => {
	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [email, setEmail] = useState('');

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	const newUser: IUser = {
		name: user,
		password: pwd,
		email: email,
	};

	const registerUser = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		axios
			.post(REGISTER_URL, newUser, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then(() => {
				setSuccess(true);
				setUser('');
				setPwd('');
				setEmail('');
			})
			.catch((error) => {
				setSuccess(false);
				if (!error?.response) {
					setErrMsg('No Server Response');
				} else if (error.response?.status === 409) {
					setErrMsg('Username Taken');
				} else {
					setErrMsg('Registration Failed');
				}
			});
	};

	return (
		<>
			{success ? (
				<Navigate to='/login' />
			) : (
				<section className='registration'>
					<p>{errMsg}</p>
					<h1 className='registration__title'>Registration</h1>
					<form className='registration__form' onSubmit={registerUser}>
						<Input
							className='registration-input'
							labelText='Name'
							type='text'
							name='name'
							id='name'
							placeholderText='Enter name...'
							handleChange={(event: ChangeEvent<HTMLInputElement>) =>
								setUser(event.target.value)
							}
							required={true}
							value={user}
							htmlFor='name'
						/>
						<Input
							className='registration-input'
							labelText='Email'
							type='email'
							name='email'
							id='email'
							placeholderText='Enter email...'
							handleChange={(event: ChangeEvent<HTMLInputElement>) =>
								setEmail(event.target.value)
							}
							required={true}
							value={email}
							htmlFor='email'
						/>
						<Input
							className='registration-input'
							labelText='Password'
							type='password'
							name='password'
							id='password'
							placeholderText='Enter password...'
							handleChange={(event: ChangeEvent<HTMLInputElement>) =>
								setPwd(event.target.value)
							}
							required={true}
							value={pwd}
							htmlFor='password'
						/>
						<Button
							className='register-user'
							buttonText='Registration'
							type='submit'
						/>
					</form>
					<p className='registration__disclaimer'>
						If you have an account you can <Link to='/login'>login</Link>
					</p>
				</section>
			)}
		</>
	);
};

export default Registration;
