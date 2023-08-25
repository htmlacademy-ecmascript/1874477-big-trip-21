import { Point } from '../types-ts';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

function getFormattedDateDiff(date1: Date, date2: Date): string {
	const dateDiff = Math.abs(dayjs(date2).diff(date1));
	const formattedDate = dayjs.duration(dateDiff).format('DD[D] HH[H] mm[M]');
	const filteredNum = formattedDate.split(' ').filter((datePart) => !/^00/.test(datePart));

	return filteredNum.join(' ');
}

function formattedCityNames(cities: string[]) {
	const validCities = cities.filter((city) => city && city.trim() !== '');
	const numValidCities = validCities.length;
	const uniqueCitiesSet = new Set(cities.filter((city) => city && city.trim() !== ''));
	const uniqueCitiesArray = Array.from(uniqueCitiesSet);
	const numCities = uniqueCitiesArray.length;

	if (numCities === 0) {
		return '';
	} else if (numCities === 1) {
		return uniqueCitiesArray[0];
	} else if (numCities === 2) {
		return `${uniqueCitiesArray[0]} — ... — ${uniqueCitiesArray[numCities - 1]}`;
	} else if (uniqueCitiesArray[1] !== validCities[numValidCities - 1]) {
		return `${validCities[0]} — ${uniqueCitiesArray[1]} — ${validCities[numValidCities - 1]}`;
	} else {
		return `${validCities[0]} — ${uniqueCitiesArray[2]} — ${validCities[numValidCities - 1]}`;
	}
}

function updateItem(items: Point[], update: Point) {
	return items.map((item) => item.id === update.id ? update : item);
}

export { getFormattedDateDiff , formattedCityNames, updateItem };
