import { FC, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import './Login.css';
import axios from '../../api/axios';
import { IUser } from './../Registration/Registration';
import useForm from './../../hooks/useForm';
import { validationRulesAuthorization } from '../../helpers/validationRules';
import { LOGIN_URL } from '../../constants';
import { handleErrorsLogin } from '../../helpers/handleErrorsAuthorization';

const Login: FC = () => {
	const { handleSubmit, handleChange, handleBlur, data, errors, touched } =
		useForm({
			validations: validationRulesAuthorization,
			onSubmit: () => handleLogin(),
		});
	const [errMsg, setErrMsg] = useState<string>('');
	const [success, setSuccess] = useState<boolean>(false);

	const user: IUser = {
		email: data.email,
		password: data.password,
	};

	const handleLogin = () => {
		axios
			.post(LOGIN_URL, user, {
				headers: {
					'Content-Type': 'application/json',
					withCredentials: true,
				},
			})
			.then((response) => {
				localStorage.setItem('token', response.data.result);
				localStorage.setItem('name', response.data.user.name);
				setSuccess(true);
			})
			.catch((error) => {
				setSuccess(false);
				setErrMsg(handleErrorsLogin(error));
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
					<form className='login__form' onSubmit={handleSubmit}>
						<Input
							className='login-input'
							labelText='Email'
							type='email'
							name='email'
							id='email'
							placeholderText='Enter email...'
							handleChange={handleChange('email')}
							handleBlur={handleBlur('email')}
							required={true}
							value={data.email || ''}
							htmlFor='email'
						/>
						{errors.email && touched.email && (
							<p className='form__error'>{errors.email}</p>
						)}
						<Input
							className='login-input'
							labelText='Password'
							type='password'
							name='password'
							id='password'
							placeholderText='Enter password...'
							handleChange={handleChange('password')}
							handleBlur={handleBlur('password')}
							required={true}
							value={data.password || ''}
							htmlFor='password'
						/>
						{errors.password && touched.password && (
							<p className='form__error'>{errors.password}</p>
						)}
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
