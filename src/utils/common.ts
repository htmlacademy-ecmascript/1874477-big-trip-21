import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Offers } from '../types-ts';

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
	} else {
		return `${validCities[0]} —...— ${validCities[numCities - 1]}`;
	}
}

function setCheckedToFalse(offers: Offers) {
	Object.values(offers).forEach((offerArray) => {
		offerArray.forEach((offer) => {
			offer.checked = false;
		});
	});
}

export { getFormattedDateDiff, formattedCityNames, setCheckedToFalse };
