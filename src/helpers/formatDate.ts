const formatDate = (date: string): string => {
	let [month, day, year] = date.split('/');
	if (day.length === 1) {
		day = `0${day}`;
	}
	if (month.length === 1) {
		month = `0${month}`;
	}
	return [day, month, year].join('.');
};

export default formatDate;
