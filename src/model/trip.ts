import Observable from '../framework/observable';
import { getRandomPoint } from '../point-mock';
import { Point } from '../types-ts';

const POINTS_COUNT = 15;

export default class PointsModel extends Observable {
	#points = Array.from({ length: POINTS_COUNT }, getRandomPoint);

	get points() {
		return this.#points;
	}

	updatePoint(updateType: unknown, update: Point) {
		const index = this.#points.findIndex((point) => point.id === update.id);

		if (index === -1) {
			throw new Error('Can\'t update unexisting point');
		}

		this.#points = [
			...this.#points.slice(0, index),
			update,
			...this.#points.slice(index + 1),
		];

		this._notify(updateType, update);
	}

	addPoint(updateType: unknown, update: Point) {
		this.#points = [
			update,
			...this.#points,
		];

		this._notify(updateType, update);
	}

	deletePoint(updateType: unknown, update: Point) {
		const index = this.#points.findIndex((point) => point.id === update.id);

		if (index === -1) {
			throw new Error('Can\'t delete unexisting point');
		}

		this.#points = [
			...this.#points.slice(0, index),
			...this.#points.slice(index + 1),
		];

		this._notify(updateType);
	}
}
