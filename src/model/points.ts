import PointsApiService from '../api/points-api';
import { AdaptedPoint } from '../api/points-api';
import Observable from '../framework/observable';
import { Point, UpdateType } from '../types-ts';

export default class PointsModel extends Observable {
	#pointsApiService: PointsApiService;
	#points: Point[] = [];

	constructor({ pointsApiService }:
		{ pointsApiService: PointsApiService }) {
		super();
		this.#pointsApiService = pointsApiService;
	}

	get points() {
		return this.#points;
	}

	get totalPrice() {
		return this.#points.reduce((totalPrice, point) => totalPrice + point.cost, 0);
	}

	async init() {
		try {
			const serverPoints: AdaptedPoint[] = await this.#pointsApiService.points;
			this.#points = serverPoints.map(this.#adaptToClient);
		} catch (err) {
			this.#points = [];
		}
	}

	notifySuccessLoad() {
		this._notify('INIT');
	}

	async updatePoint(updateType: UpdateType, update: Point): Promise<Point> {
		const index = this.#points.findIndex((point) => point.id === update.id);

		if (index === -1) {
			throw new Error('Can\'t update unexisting point');
		}

		try {
			const response = await this.#pointsApiService.updatePoint(update);
			const updatedPoint = this.#adaptToClient(response);
			this.#points = [
				...this.#points.slice(0, index),
				updatedPoint,
				...this.#points.slice(index + 1),
			];
			this._notify(updateType, updatedPoint);
			return updatedPoint;
		} catch (err) {
			throw new Error('Can\'t update point');
		}
	}

	async addPoint(updateType: UpdateType, update: Point) {
		try {
			const response = await this.#pointsApiService.addPoint(update);
			const newPoint = this.#adaptToClient(response);
			this.#points = [newPoint, ...this.#points];
			this._notify(updateType, newPoint);
		} catch (err) {
			throw new Error('Can\'t add point');
		}

		this._notify(updateType, update);
	}

	async deletePoint(updateType: UpdateType, update: Point) {
		const index = this.#points.findIndex((point) => point.id === update.id);

		if (index === -1) {
			throw new Error('Can\'t delete unexisting point');
		}

		try {
			await this.#pointsApiService.deletePoint(update);
			this.#points = [
				...this.#points.slice(0, index),
				...this.#points.slice(index + 1),
			];
			this._notify(updateType);
		} catch (err) {
			throw new Error('Can\'t delete task');
		}
	}

	#adaptToClient(point: AdaptedPoint): Point {
		const adaptedPoint: Point = {
			...point,
			dateFrom: point.date_from,
			dateTo: point.date_to,
			cost: point.base_price,
			isFavorite: point.is_favorite,
		};

		delete adaptedPoint['base_price'];
		delete adaptedPoint['date_from'];
		delete adaptedPoint['date_to'];
		delete adaptedPoint['is_favorite'];

		return adaptedPoint;
	}
}
