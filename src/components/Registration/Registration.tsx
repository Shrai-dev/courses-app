import { FC, useState } from 'react';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import './Registration.css';
import { Link, Navigate } from 'react-router-dom';
import axios from '../../api/axios';
import useForm from './../../hooks/useForm';
import { validationRulesAuthorization } from '../../helpers/validationRules';
import { REGISTER_URL } from '../../constants';
import { handleErrorsRegistration } from './../../helpers/handleErrorsAuthorization';

export interface IUser {
	name?: string;
	email: string;
	password: string;
}

const Registration: FC = () => {
	const { handleSubmit, handleChange, handleBlur, data, errors, touched } =
		useForm({
			validations: validationRulesAuthorization,
			onSubmit: () => registerUser(),
		});

	const [errMsg, setErrMsg] = useState<string>('');
	const [success, setSuccess] = useState<boolean>(false);

	const newUser: IUser = {
		name: data.name,
		email: data.email,
		password: data.password,
	};

	const registerUser = () => {
		axios
			.post(REGISTER_URL, newUser, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then(() => {
				setSuccess(true);
			})
			.catch((error) => {
				setSuccess(false);
				setErrMsg(handleErrorsRegistration(error));
			});
	};

	return (
		<>
			{success ? (
				<Navigate to='/login' />
			) : (
				<section className='registration'>
					<p className='form__error'>{errMsg}</p>
					<h1 className='registration__title'>Registration</h1>
					<form className='registration__form' onSubmit={handleSubmit}>
						<Input
							className='registration-input'
							labelText='Name'
							type='text'
							name='name'
							id='name'
							placeholderText='Enter name...'
							handleChange={handleChange('name')}
							handleBlur={handleBlur('name')}
							required={true}
							value={data.name || ''}
							htmlFor='name'
						/>
						{errors.name && touched.name && (
							<p className='form__error'>{errors.name}</p>
						)}
						<Input
							className='registration-input'
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
							className='registration-input'
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
