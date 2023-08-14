import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

function getRandomArrayElement<T>(array: T[]): T {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}

function getFormattedDateDiff(date1: Date, date2: Date): string {
	const dateDiff = Math.abs(dayjs(date2).diff(date1));
	const formattedDate = dayjs.duration(dateDiff).format('DD[D] HH[H] mm[M]');
	const filteredNums = formattedDate.split(' ').filter((datePart) => !/^00/.test(datePart));

	return filteredNums.join(' ');
}

function formattedCityNames(cities: string[]) {
	const validCities = cities.filter((city) => city && city.trim() !== '');
	const numCities = validCities.length;

	if (numCities === 0) {
		return '';
	} else if (numCities === 1) {
		return validCities[0];
	} else if (numCities <= 3) {
		return validCities.join(' — ');
	} else {
		return `${validCities[0]} — ${validCities[numCities - 1]}`;
	}
}

export { getRandomArrayElement, getFormattedDateDiff , formattedCityNames };

