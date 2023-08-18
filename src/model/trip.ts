import { getRandomPoint } from '../point-mock';

const POINTS_COUNT = 5;

export default class PointsModel {
	#points = Array.from({ length: POINTS_COUNT }, getRandomPoint);

	get points() {
		return this.#points;
	}

	getById(id: string) {
		return this.#points.find((point) => point.id === id);
	}
}
