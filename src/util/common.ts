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
	const numCities = validCities.length;

	if (numCities === 0) {
		return '';
	} else if (numCities === 1) {
		return validCities[0];
	} else if (numCities === 2 && validCities.length === 2) {
		return `${validCities[0]} — ${validCities[1]}`;
	} else if (numCities === 3 && validCities.length === 3) {
		return `${validCities[0]} — ${validCities[1]}  — ${validCities[2]}`;
	} else {
		return `${validCities[0]} —...— ${validCities[numCities - 1]}`;
	}
}

export { getFormattedDateDiff, formattedCityNames };
