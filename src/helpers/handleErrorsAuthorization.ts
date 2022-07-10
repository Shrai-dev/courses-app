export const handleErrorsRegistration = (error: any) => {
	if (!error?.response) {
		return 'No Server Response';
	} else if (error.response?.status === 409) {
		return 'Username Taken';
	} else {
		return 'Registration Failed';
	}
};

export const handleErrorsLogin = (error: any) => {
	if (!error?.response) {
		return 'No Server Response';
	} else if (error.response?.status === 400) {
		return 'Missing Email or Password';
	} else if (error.response?.status === 401) {
		return 'Unauthorized';
	} else {
		return 'Login Failed';
	}
};
