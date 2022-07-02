import { useState, ChangeEvent, FocusEvent, FormEvent } from 'react';

interface IErrors {
	[x: string]: string;
}

interface ITouchedInput {
	[x: string]: string | boolean;
}

const useForm = (options: any) => {
	const [data, setData] = useState(options?.initialValues || {});
	const [errors, setErrors] = useState<IErrors>({});
	const [touched, setTouched] = useState<ITouchedInput>({});

	const handleChange =
		(key: string) =>
		(
			event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
		) => {
			const value = event.target.value;
			setData({
				...data,
				[key]: value,
			});
			const validations = options?.validations;
			if (validations) {
				let valid = true;
				const newErrors: { [x: string]: string } = {};
				for (const key in validations) {
					const value = data[key];
					const validation = validations[key];
					if (validation?.required?.value && !value) {
						valid = false;
						newErrors[key] = validation?.required?.message;
					}
					const pattern = validation?.pattern;
					if (pattern?.value && !RegExp(pattern.value).test(value)) {
						valid = false;
						newErrors[key] = pattern.message;
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
			}
			setErrors({});
		};

	const handleBlur =
		(key: string) =>
		(
			event: FocusEvent<HTMLInputElement> | FocusEvent<HTMLTextAreaElement>
		): void => {
			setTouched((prevTouched) => ({ ...prevTouched, [key]: true }));
		};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (options?.onSubmit) {
			options.onSubmit();
		}
	};

	return { data, handleChange, handleSubmit, handleBlur, errors, touched };
};

export default useForm;
