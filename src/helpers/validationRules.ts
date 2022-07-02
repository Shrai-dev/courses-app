interface IValidationRules {
	title?: {
		custom: {
			isValid: (value: string) => boolean;
			message: string;
		};
	};
	description?: {
		custom: {
			isValid: (value: string) => boolean;
			message: string;
		};
	};
	duration?: {
		custom: {
			isValid: (value: string) => boolean;
			message: string;
		};
	};
	name?: {
		custom: {
			isValid: (value: string) => boolean;
			message: string;
		};
	};
	email?: {
		pattern: {
			value: string;
			message: string;
		};
	};
	password?: {
		custom: {
			isValid: (value: string) => boolean;
			message: string;
		};
	};
}

export const validationRulesCourse: IValidationRules = {
	title: {
		custom: {
			isValid: (value: string) => {
				if (!value) return false;
				return value.length < 2 ? false : true;
			},
			message: 'The title is required',
		},
	},
	description: {
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

export const validationRulesAuthorization: IValidationRules = {
	name: {
		custom: {
			isValid: (value: string) => {
				if (!value) return false;
				return value.length < 2 ? false : true;
			},
			message: 'The name needs to be at least 2 characters long',
		},
	},
	email: {
		pattern: {
			value: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$',
			message: 'Enter valid email.',
		},
	},
	password: {
		custom: {
			isValid: (value: string) => {
				if (!value) return false;
				return value.length < 6 ? false : true;
			},
			message: 'The password needs to be at least 6 characters long.',
		},
	},
};
