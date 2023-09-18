import { now } from '../const';
import { Point, FilterType } from '../types-ts';

const FILTER_FUNCTIONS: Record<FilterType, (points: Point[]) => Point[]> = {
	everything: (points) => points,
	future: (points) => points.filter((point) => now.isBefore(point.dateFrom)),
	present: (points) => points.filter((point) => now.isAfter(point.dateTo) && now.isBefore(point.dateFrom)),
	past: (points) => points.filter((point) => now.isAfter(point.dateTo)),
};

export { FILTER_FUNCTIONS };
