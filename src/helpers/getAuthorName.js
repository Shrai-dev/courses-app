import { mockedAuthorsList } from '../constants';
const getAuthorName = (array) => {
	let authorsArr = [];
	for (let i = 0; i < mockedAuthorsList.length; i++) {
		for (let j = 0; j < array.length; j++) {
			if (array[j] === mockedAuthorsList[i]['id']) {
				authorsArr.push(mockedAuthorsList[i]['name']);
			}
		}
	}
	return authorsArr.join(', ');
};

export default getAuthorName;
