import { useState, useEffect } from 'react';

const useForm = (options) => {
	const [data, setData] = useState(options?.initialValues || {});
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	useEffect(() => {
		setErrors('');
	}, [data.title, data.description, data.duration]);

	const handleChange = (key) => (event) => {
		const value = event.target.value;
		setData({
			...data,
			[key]: value,
		});
	};

	const handleBlur = () => (event) => {
		const { name } = event.target;
		setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
		const validations = options?.validations;
		if (validations) {
			let valid = true;
			const newErrors = {};
			for (const key in validations) {
				const value = data[key];
				const validation = validations[key];
				if (validation?.required?.value && !value) {
					valid = false;
					newErrors[key] = validation?.required?.message;
				}
				const custom = validation?.custom;
				if (custom?.isValid && !custom.isValid(value)) {
					valid = false;
					newErrors[key] = custom.message;
				}
			}
			if (!valid) {
				setErrors(newErrors);
				return;
			}
			setErrors({});
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const validations = options?.validations;
		if (validations) {
			let valid = true;
			const newErrors = {};
			for (const key in validations) {
				const value = data[key];
				const validation = validations[key];
				if (validation?.required?.value && !value) {
					valid = false;
					newErrors[key] = validation?.required?.message;
				}
				const custom = validation?.custom;
				if (custom?.isValid && !custom.isValid(value)) {
					valid = false;
					newErrors[key] = custom.message;
				}
			}
			if (!valid) {
				setErrors(newErrors);
				alert('Please, fill in all fields');
				return;
			}
		}

		setErrors({});

		if (options?.onSubmit) {
			options.onSubmit();
		}
	};

	return { data, handleChange, handleSubmit, handleBlur, errors, touched };
};

export default useForm;
