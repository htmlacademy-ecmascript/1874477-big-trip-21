import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const DATE_FORMATS = {
  CHOSED_DATE: 'DD/MM/YY HH:mm',
  FOR_POINT_PERIODS: 'HH:mm',
  FOR_POINT: 'MMM DD',
  LESS_THAN_HOUR: 'mm',
  LESS_THAN_DAY: 'HH mm',
  MORE_THAN_DAY: 'DD HH mm',
  TRIP_INFO: 'D MMM'
};

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

function formatCityNames(cities: string[]) {
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

export { getRandomArrayElement, getFormattedDateDiff, DATE_FORMATS , formatCityNames };

