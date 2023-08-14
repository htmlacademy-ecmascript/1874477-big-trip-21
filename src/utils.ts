import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DATE_FORMATS } from './const';

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
  const validCities = cities.filter(city => city && city.trim() !== '');
  const numCities = validCities.length;

  return numCities === 0
    ? ''
    : numCities === 1
    ? validCities[0]
    : numCities <= 3
    ? validCities.join(' — ')
    : `${validCities[0]} — ${validCities[numCities - 1]}`;
}

export { getRandomArrayElement, getFormattedDateDiff , formattedCityNames };

