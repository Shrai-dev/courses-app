interface IValidationRules {
	title: {
		required: {
			value: boolean;
			message: string;
		};
	};
	description: {
		required: {
			value: boolean;
			message: string;
		};
		custom: {
			isValid: (value: string) => boolean;
			message: string;
		};
	};
	duration: {
		custom: {
			isValid: (value: string) => boolean;
			message: string;
		};
	};
}

export const validationRules: IValidationRules = {
	title: {
		required: {
			value: true,
			message: 'The title is required',
		},
	},
	description: {
		required: {
			value: true,
			message: 'This field is required',
		},
		custom: {
			isValid: (value: string) => {
				if (!value) return false;
				return value.length < 2 ? false : true;
			},
			message: 'The description needs to be at least 2 characters long',
		},
	},
	duration: {
		custom: {
			isValid: (value: string) => parseInt(value, 10) > 0,
			message: 'The duration needs to be more than 0',
		},
	},
};
