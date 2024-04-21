import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';


dayjs.extend(duration);

const enum TimeDiff {
  Day = 60 * 60 * 24 * 1000,
}

function getFormattedDateDiff(date1: Date, date2: Date): string {
  const diff = Math.abs(dayjs(date2).diff(date1));

  const days = Math.floor(diff / TimeDiff.Day);

  const withUnits = dayjs.duration(diff).format('DD[D] HH[H] mm[M]').split(' ');

  if (dayjs.duration(diff).get('day') !== days) {
    withUnits[0] = `${days}D`;
  }

  return withUnits.join(' ');
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
