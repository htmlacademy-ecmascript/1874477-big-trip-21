import { Point, FilterType } from '../types-ts';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const now = dayjs();
const FILTER_FUNCTIONS: Record<FilterType, (points: Point[]) => Point[]> = {
	everything: (points) => points,
	future: (points) => points.filter((point) => now.isBefore(point.dateFrom)),
	present: (points) => points.filter((point) => now.isSameOrAfter(point.dateFrom) && now.isSameOrBefore(point.dateTo)),
	past: (points) => points.filter((point) => now.isAfter(point.dateTo)),
};

export { FILTER_FUNCTIONS };
