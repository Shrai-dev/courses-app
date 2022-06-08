import { useState } from 'react';

const useForm = (options) => {
	const [data, setData] = useState(options?.initialValues || {});
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	const handleChange = (key) => (event) => {
		const value = event.target.value;
		setData({
			...data,
			[key]: value,
		});
	};

	const handleBlur = (key) => (event) => {
		const { name } = event.target;
		setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
		const validations = options?.validations;
		if (validations) {
			let valid = true;
			const newErrors = {};
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

			if (!valid) {
				setErrors(newErrors);
				return;
			}
		}
		setErrors({});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		setErrors({});

		if (options?.onSubmit) {
			options.onSubmit();
		}
	};

	return { data, handleChange, handleSubmit, handleBlur, errors, touched };
};

export default useForm;
