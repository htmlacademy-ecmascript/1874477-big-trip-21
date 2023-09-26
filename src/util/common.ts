import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

function getFormattedDateDiff(date1: Date, date2: Date): string {
  const dateDiff = Math.abs(dayjs(date2).diff(date1));
  const formattedDate = dayjs.duration(dateDiff).format('DD[D] HH[H] mm[M]');
  const parts = formattedDate.split(' ');

  const resultParts = [
    (parseInt(parts[0], 10) > 0 && parts[0] !== '00') ? `${parts[0]}` : '',
    (parts[1] !== '00' && parseInt(parts[0], 10) > 0) || (parseInt(parts[1], 10) > 0) ? parts[1] : '',
    parts[2] !== '00' ? parts[2] : ''
  ];

  const formattedResultDate = resultParts.filter((part) => part !== '').join(' ');

  return formattedResultDate.trim();
}

function formattedCityNames(cities: string[]) {
  const validCities = cities.filter((city) => city && city.trim() !== '');
  const numCities = validCities.length;

  switch (numCities) {
    case 0:
      return '';
    case 1:
      return validCities[0];
    case 2:
      if (validCities.length === 2) {
        return `${validCities[0]} — ${validCities[1]}`;
      }
      break;
    case 3:
      if (validCities.length === 3) {
        return `${validCities[0]} — ${validCities[1]} — ${validCities[2]}`;
      }
      break;
    default:
      return `${validCities[0]} —...— ${validCities[numCities - 1]}`;
  }
}

export { getFormattedDateDiff, formattedCityNames };
