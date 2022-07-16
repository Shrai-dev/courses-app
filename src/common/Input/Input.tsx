import React, { FC } from 'react';
import './Input.css';

export interface IInputProps {
	id: string;
	htmlFor: string;
	labelText?: string;
	className: string;
	handleChange?: any;
	handleBlur?: any;
	type: 'text' | 'number' | 'password' | 'email';
	name: string;
	placeholderText: string;
	minLength?: number;
	required?: boolean;
	value?: string | number;
}

const Input: FC<IInputProps> = (props) => {
	return (
		<label htmlFor={props.id}>
			{props.labelText}
			<input
				className={props.className}
				type={props.type}
				name={props.name}
				id={props.id}
				placeholder={props.placeholderText}
				onChange={props.handleChange}
				minLength={props.minLength}
				required={props.required}
				value={props.value}
				onBlur={props.handleBlur}
			/>
		</label>
	);
};

export default Input;
