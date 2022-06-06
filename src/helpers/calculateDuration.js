const calculateDuration = (value) => {
	if (!value) {
		return '00:00';
	} else {
		let hours = Math.floor(value / 60);
		let minutes = value % 60;
		if (hours < 10) {
			hours = `0${hours}`;
		}
		if (minutes < 10) {
			minutes = `0${minutes}`;
		}
		return `${hours}:${minutes}`;
	}
};

export default calculateDuration;
