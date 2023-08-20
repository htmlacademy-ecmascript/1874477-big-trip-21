import FilterView from '../views/filter';
import TripInfoView from '../views/trip-info';
import TripEmptyView from '../views/trip-empty-list';
import SortView from '../views/sort';
import PointPresenter from './point';
import EventListView from '../views/trip-list';
import PointsModel from '../model/trip';
import { Point } from '../types-ts';
import { render } from '../framework/render';

const headerTripElement = document.querySelector<HTMLDivElement>('.trip-main')!;
const headerFilterElement = document.querySelector<HTMLDivElement>('.trip-controls__filters')!;

export default class TripPresenter {
	#tripComponent = new EventListView();
	#tripContainer: HTMLDivElement;
	#pointsModel: PointsModel;
	#points: Point[] = [];
	#sortView!: SortView;


	constructor({ tripContainer, pointsModel }: { tripContainer: HTMLDivElement; pointsModel: PointsModel }) {
		this.#tripContainer = tripContainer;
		this.#pointsModel = pointsModel;
	}

	init() {
		this.#points = [...this.#pointsModel.points];
		const tripInfoView = new TripInfoView(this.#points);
		const filterView = new FilterView(this.#points, this.#filterPoints.bind(this));
		this.#sortView = new SortView(this.#points, this.#sortedPoints.bind(this));

		render(this.#sortView, this.#tripContainer);
		render(tripInfoView, headerTripElement, 'afterbegin');
		render(filterView, headerFilterElement);

		this.#renderFilteredPoints();
		this.#renderSortedPoints();
	}

	#renderFilteredPoints() {
		this.#tripComponent.clearPointList();

		if (this.#points.length > 0) {
			render(this.#tripComponent, this.#tripContainer);
		} else {
			const tripEmptyMessage = new TripEmptyView('empty');
			render(tripEmptyMessage, this.#tripContainer);
		}

		this.#sortView.sortPoints();

		for (let i = 0; i < this.#points.length; i++) {
			this.#renderPoint(this.#points[i]);
		}
	}

	#renderSortedPoints() {
		this.#tripComponent.clearPointList();
		this.#sortView.sortPoints();

		for (let i = 0; i < this.#points.length; i++) {
			this.#renderPoint(this.#points[i]);
		}


	}

	#renderPoint(point: Point) {
		const pointPresenter = new PointPresenter(this.#tripComponent.element);
		pointPresenter.renderPoint(point);
	}

	#filterPoints(filteredPoints: Point[]) {
		this.#points = filteredPoints;
		this.#sortedPoints(this.#points);
		this.#renderFilteredPoints();
	}

	#sortedPoints(sortedPoints: Point[]) {
		this.#points = sortedPoints;
		this.#sortView.sortPoints();
		this.#renderSortedPoints();
	}
}
