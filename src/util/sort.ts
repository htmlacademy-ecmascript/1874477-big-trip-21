import { Point } from '../types-ts';
import dayjs from 'dayjs';

function sortByPrice(a: Point, b: Point): number {
	return b.cost - a.cost;
}

function sortByDuration(a: Point, b: Point): number {
	return dayjs(b.dateTo).diff(dayjs(b.dateFrom)) - dayjs(a.dateTo).diff(dayjs(a.dateFrom));
}

function sortByDate(a: Point, b: Point): number {
	return dayjs(a.dateFrom).diff(dayjs(b.dateFrom));
}

export { sortByPrice, sortByDuration, sortByDate };
