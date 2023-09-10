import PointsModel from '../model/trip';
import PointPresenter from './point';
import TripListView from '../views/trip-list';
import TripInfoView from '../views/trip-info';
import TripSortView from '../views/trip-sort';
import { headerTripElement } from '../main';
import { SORT_TYPES, FILTER_TYPES, FILTER_FUNCTIONS } from '../const';
import { Point, UpdateType, UserAction, FilterType, SortType } from '../types-ts';
import { sortByPrice, sortByDuration, sortByDate } from '../utils/point';
import { render, remove } from '../framework/render';
import FilterModel from '../model/filter';
import TripEmptyView from '../views/trip-empty-list';

export default class TripPresenter {
	#tripComponent = new TripListView();
	#tripContainer: HTMLDivElement;

	#pointsModel: PointsModel;
	#filterModel: FilterModel;
	#pointPresenters = new Map();

	#tripInfo: TripInfoView | null = null;
	#sortComponent: TripSortView | null = null;
	#noPointComponent: TripEmptyView | null = null;
	#currentSortType: SortType = SORT_TYPES[2];
	#filterType: FilterType = FILTER_TYPES[0];

	constructor({ tripContainer, pointsModel, filterModel }:
		{ tripContainer: HTMLDivElement; pointsModel: PointsModel; filterModel: FilterModel}) {
		this.#tripContainer = tripContainer;
		this.#pointsModel = pointsModel;
		this.#filterModel = filterModel;

		this.#pointsModel!.addObserver(this.#handleModelEvent);
		this.#filterModel!.addObserver(this.#handleModelEvent);
	}

	get points() {
		this.#filterType = this.#filterModel!.filter;
		const points = this.#pointsModel!.points;
		const filteredPoints = FILTER_FUNCTIONS[this.#filterType](points);

		switch (this.#currentSortType) {
			case SORT_TYPES[0]:
				return filteredPoints.sort(sortByPrice);
			case SORT_TYPES[1]:
				return filteredPoints.sort(sortByDuration);
			case SORT_TYPES[2]:
				return filteredPoints.sort(sortByDate);
		}
	}

	init() {
		this.#renderTrip();
	}

	#handleViewAction = (actionType: UserAction, updateType: UpdateType, update: Point) => {
		switch (actionType) {
			case 'UPDATE_POINT':
				this.#pointsModel?.updatePoint(updateType, update);
				break;
			case 'ADD_POINT':
				this.#pointsModel?.addPoint(updateType, update);
				break;
			case 'DELETE_POINT':
				this.#pointsModel?.deletePoint(updateType, update);
				break;
		}
	};

	/* Не могу избавиться от типа any в data: any */
	#handleModelEvent = (updateType: UpdateType, data?: Point | FilterType) => {
		switch (updateType) {
			case 'PATCH':
				if (data && typeof data !== 'string') {
					this.#pointPresenters.get(data.id).init(data);
				}
				break;
			case 'MINOR':
				this.#clearTripList();
				remove(this.#tripInfo!);
				this.#renderTripInfo();
				this.#renderTripList();
				break;
			case 'MAJOR':
				this.#clearTripList({ resetSortType: true });
				remove(this.#tripInfo!);
				this.#renderTripInfo();
				this.#renderTripList();
				break;
		}
	};

	#handleModeChange = () => {
		this.#pointPresenters.forEach((presenter) => presenter.resetView());
	};

	#handleSortChange = (sortType: SortType) => {
		if (this.#currentSortType === sortType) {
			return;
		}

		this.#currentSortType = sortType;
		this.#clearTripList();
		this.#renderTripList();
	};

	#renderSort() {
		this.#sortComponent = new TripSortView({ onSortChange: this.#handleSortChange });
		render(this.#sortComponent, this.#tripContainer, 'afterbegin');
	}

	#renderPoint(point: Point) {
		const pointPresenter = new PointPresenter({
			pointContainer: this.#tripComponent.element,
			onDataChange: this.#handleViewAction,
			onModeChange: this.#handleModeChange
		});
		pointPresenter.init(point);
		this.#pointPresenters.set(point.id, pointPresenter);
	}

	#renderPoints(points: Point[]) {
		points.forEach((point) => this.#renderPoint(point));
	}

	#renderNoPoints() {
		this.#noPointComponent = new TripEmptyView({
			filterType: this.#filterType,
		});

		render(this.#noPointComponent, this.#tripComponent.element, 'afterbegin');
	}

	#clearTripList({ resetSortType = false } = {}) {
		this.#pointPresenters.forEach((presenter) => presenter.destroy());
		this.#pointPresenters.clear();

		if (resetSortType) {
			this.#currentSortType = SORT_TYPES[0];
		}

		if (this.#noPointComponent) {
			remove(this.#noPointComponent);
		}
	}

	#renderTripList() {
		const points = this.points;
		render(this.#tripComponent, this.#tripContainer);

		this.#renderPoints(points);

		if (this.points.length === 0) {
			this.#renderNoPoints();
		}
	}

	#renderTripInfo() {
		this.#tripInfo = new TripInfoView(this.points);
		render(this.#tripInfo, headerTripElement, 'afterbegin');
	}

	#renderTrip() {
		this.#renderTripInfo();
		this.#renderSort();
		this.#renderTripList();

		if (this.points.length === 0) {
			this.#renderNoPoints();
		}
	}
}
