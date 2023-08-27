import PointsModel from '../model/trip';
import PointPresenter from './point';
import TripListView from '../views/trip-list';
import TripInfoView from '../views/trip-info';
import TripSortView from '../views/trip-sort';
import TripEmptyView from '../views/trip-empty-list';
import { SortType } from '../views/trip-sort';
import { SORT_TYPES } from '../const';
import { Point } from '../types-ts';
import { updateItem } from '../utils/common';
import { render } from '../framework/render';
import dayjs from 'dayjs';

const headerTripElement = document.querySelector<HTMLDivElement>('.trip-main')!;
// const headerFilterElement = document.querySelector<HTMLDivElement>('.trip-controls__filters')!;

export default class TripPresenter {
	#tripComponent = new TripListView();
	#tripContainer: HTMLDivElement;

	#pointsModel: PointsModel | null = null;
	#pointPresenters = new Map();

	#tripPoints: Point[] = [];

	#sortComponent: TripSortView | null = null;
	#noTripComponent = new TripEmptyView('Click New Event to create your first point');
	#currentSortType: SortType = SORT_TYPES[2];
	#sourcedTripPoints: Point[] = [];


	constructor({ tripContainer, pointsModel }: { tripContainer: HTMLDivElement; pointsModel: PointsModel | null }) {
		this.#tripContainer = tripContainer;
		this.#pointsModel = pointsModel;

	}

	init() {
		this.#tripPoints = [...this.#pointsModel!.points];
		this.#sourcedTripPoints = [...this.#pointsModel!.points];

		this.#renderTrip();
	}

	#handlePointChange = (updatedPoint: Point) => {
		this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
		this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
		this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
	};

	#handleModeChange = () => {
		this.#pointPresenters.forEach((presenter) => presenter.resetView());
	};

	#sortPoints(sortType: SortType) {
		switch (sortType) {
			case SORT_TYPES[0]:
				this.#tripPoints.sort((a, b) => a.cost - b.cost);
				break;
			case SORT_TYPES[1]:
				this.#tripPoints.sort((a, b) => dayjs(a.dateTo).diff(dayjs(a.dateFrom)) - dayjs(b.dateTo).diff(dayjs(b.dateFrom)));
				break;
			default:
				this.#tripPoints.sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));
		}

		this.#currentSortType = sortType;
	}

	#handleSortChange = (sortType: SortType) => {
		if (this.#currentSortType === sortType) {
			return;
		}

		this.#sortPoints(sortType);
		this.#clearPointList();
		this.#renderTripList();
	};

	#renderSort() {
		this.#sortComponent = new TripSortView({ onSortChange: this.#handleSortChange });
		render(this.#sortComponent, this.#tripContainer, 'afterbegin');
	}

	#renderPoint(point: Point) {
		const pointPresenter = new PointPresenter({
			pointContainer: this.#tripComponent.element,
			onDataChange: this.#handlePointChange,
			onModeChange: this.#handleModeChange});
		pointPresenter.init(point);
		this.#pointPresenters.set(point.id, pointPresenter);
	}

	#renderPoints() {
		this.#tripPoints.forEach((point) => this.#renderPoint(point));
	}

	#renderNoPoints() {
		render(this.#noTripComponent, this.#tripComponent.element, 'afterbegin');
	}

	#clearPointList() {
		this.#pointPresenters.forEach((presenter) => presenter.destroy());
		this.#pointPresenters.clear();
	}

	#renderTripList() {
		render(this.#tripComponent, this.#tripContainer);
		this.#renderPoints();
	}

	#renderTrip() {
		render(new TripInfoView(this.#sourcedTripPoints), headerTripElement, 'afterbegin');

		this.#renderSort();
		this.#renderTripList();

		if(this.#tripPoints.length === 0) {
			this.#renderNoPoints();
		}
	}
}
