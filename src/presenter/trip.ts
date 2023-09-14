import PointsModel from '../model/trip';
import FilterModel from '../model/filter';
import PointPresenter from './point';
import NewPointPresenter from './new-point';
import TripListView from '../views/trip-list';
import TripEmptyView from '../views/trip-empty-list';
import NewPointButtonView from '../views/new-point-button';
import TripInfoView from '../views/trip-info';
import TripSortView from '../views/trip-sort';
import { SORT_TYPES, FILTER_TYPES, FILTER_FUNCTIONS } from '../const';
import { Point, UpdateType, UserAction, FilterType, SortType } from '../types-ts';
import { sortByPrice, sortByDuration, sortByDate } from '../utils/point';
import { render, remove } from '../framework/render';

interface TripPresenterProps {
	infoContainer: HTMLDivElement,
	tripContainer: HTMLDivElement,
	pointsModel: PointsModel,
	filterModel: FilterModel
}

export default class TripPresenter {
	#tripComponent = new TripListView();
	#infoContainer: HTMLDivElement;
	#tripContainer: HTMLDivElement;

	#pointsModel: PointsModel;
	#filterModel: FilterModel;

	#pointPresenters = new Map();
	#newPointPresenter: NewPointPresenter | null = null;

	#newPointButton: NewPointButtonView | null = null;
	#tripInfo: TripInfoView | null = null;
	#sortComponent: TripSortView | null = null;
	#noPointComponent: TripEmptyView | null = null;
	#currentSortType: SortType = SORT_TYPES[2];
	#filterType: FilterType = FILTER_TYPES[0];

	constructor({ infoContainer, tripContainer, pointsModel, filterModel }: TripPresenterProps) {
		this.#infoContainer = infoContainer;
		this.#tripContainer = tripContainer;
		this.#pointsModel = pointsModel;
		this.#filterModel = filterModel;

		this.#newPointPresenter = new NewPointPresenter({
			pointContainer: this.#tripComponent.element,
			onDataChange: this.#handleViewAction,
			onDestroy: this.#onNewPointDestroy
		});

		this.#newPointButton = new NewPointButtonView({
			onClick: this.#handleNewPointButtonClick
		});

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

	#handleNewPointButtonClick = () => {
		this.#renderNewPoint();
		this.#newPointButton!.setDisableAttribute();
	};

	#onNewPointDestroy = () => {
		this.#newPointButton!.removeDisabledAttribute();
	};

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

	#handleModelEvent = (updateType: UpdateType, data?: Point) => {
		switch (updateType) {
			case 'PATCH':
				this.#pointPresenters.get(data!.id).init(data);
				break;
			case 'MINOR':
				this.#handleModelEventChanche();
				break;
			case 'MAJOR':
				this.#handleModelEventChanche(true);
				break;
		}
	};

	#handleModelEventChanche = (resetSortType = false) => {
		this.#clearTripList({ resetSortType });
		remove(this.#tripInfo!);
		remove(this.#sortComponent!);
		this.#renderTripInfo();
		this.#renderTripList();
	};

	#handleModeChange = () => {
		this.#newPointPresenter!.destroy();
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
		if (this.points.length > 0) {
			render(this.#sortComponent, this.#tripContainer, 'afterbegin');
		}
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

	#renderNewPoint() {
		this.#currentSortType = SORT_TYPES[2];
		this.#filterModel.setFilter('MAJOR', 'everything');
		this.#newPointPresenter!.init();
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
			this.#currentSortType = SORT_TYPES[2];
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
		render(this.#tripInfo, this.#infoContainer, 'afterbegin');
		render(this.#newPointButton!, this.#infoContainer);

		this.#renderSort();
	}

	#renderTrip() {
		this.#renderTripInfo();
		this.#renderTripList();
	}
}
