function getRandomArrayElement<T>(array: T[]): T {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

function capitalizeFirstLetter(str: string):string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export { getRandomArrayElement, capitalizeFirstLetter };

