import FilterView from '../views/filter';
import TripInfoView from '../views/trip-info';
import SortView from '../views/sort';
import PointPresenter from './point';
import EventListView from '../views/trip-list';
import PointsModel from '../model/trip';
import { Point } from '../types-ts';
import { render } from '../framework/render';

const headerTripElement = document.querySelector<HTMLDivElement>('.trip-main');
const headerFilterElement = document.querySelector<HTMLDivElement>('.trip-controls__filters');

export default class TripPresenter {
	#tripComponent = new EventListView();
	#tripContainer: HTMLDivElement;
	#pointsModel: PointsModel;
	#points: Point[] = [];

	constructor({ tripContainer, pointsModel }: { tripContainer: HTMLDivElement, pointsModel: PointsModel }) {
		this.#tripContainer = tripContainer;
		this.#pointsModel = pointsModel;
	}

	init() {
		this.#points = [...this.#pointsModel.points];

		render(new SortView(), this.#tripContainer);
		render(this.#tripComponent, this.#tripContainer);


		for (let i = 0; i < this.#points.length; i++) {
			this.#renderPoint(this.#points[i]);
		}

		if (headerTripElement && headerFilterElement) {
			const tripInfoView = new TripInfoView(this.#points);
			render(tripInfoView, headerTripElement, 'afterbegin');

			const filterView = new FilterView();
			render(filterView, headerFilterElement);
		}
	}

	#renderPoint(point: Point) {
		const pointPresenter = new PointPresenter(this.#tripComponent.element);
		pointPresenter.renderPoint(point);
	}
}
