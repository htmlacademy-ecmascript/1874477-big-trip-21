import PointsModel from '../model/points';
import FilterModel from '../model/filter';
import OffersModel from '../model/offers';
import DestinationsModel from '../model/destinations';
import PointPresenter from './point';
import NewPointPresenter from './new-point';
import TripListView from '../views/trip-list';
import TripEmptyView from '../views/trip-empty-list';
import NewPointButtonView from '../views/new-point-button';
import TripInfoView from '../views/trip-info';
import TripSortView from '../views/trip-sort';
import LoadingView from '../views/loading';
import { Point, UpdateType, UserAction, FilterType, SortType, Offer, Destination } from '../types-ts';
import { sortByPrice, sortByDuration, sortByDate } from '../utils/sort';
import { FILTER_FUNCTIONS } from '../utils/filter';
import { render, remove } from '../framework/render';

interface TripPresenterProps {
	infoContainer: HTMLDivElement,
	tripContainer: HTMLDivElement,
	pointsModel: PointsModel,
	filterModel: FilterModel,
	offersModel: OffersModel,
	destinationsModel: DestinationsModel
}

export default class TripPresenter {
	#tripComponent = new TripListView();
	#loadingComponent = new LoadingView();
	#infoContainer: HTMLDivElement;
	#tripContainer: HTMLDivElement;

	#pointsModel: PointsModel;
	#filterModel: FilterModel;
	#offersModel: OffersModel;
	#destinationsModel: DestinationsModel;

	#pointPresenters = new Map();
	#newPointPresenter: NewPointPresenter | null = null;

	#newPointButton: NewPointButtonView | null = null;
	#tripInfo: TripInfoView | null = null;
	#sortComponent: TripSortView | null = null;
	#noPointComponent: TripEmptyView | null = null;
	#currentSortType: SortType = 'sort-day';
	#filterType: FilterType = 'everything';
	#isLoading = true;

	constructor({ infoContainer, tripContainer, pointsModel, destinationsModel, offersModel, filterModel }: TripPresenterProps) {
		this.#infoContainer = infoContainer;
		this.#tripContainer = tripContainer;
		this.#pointsModel = pointsModel;
		this.#destinationsModel = destinationsModel;
		this.#offersModel = offersModel;
		this.#filterModel = filterModel;

		this.#newPointButton = new NewPointButtonView({
			onClick: this.#handleNewPointButtonClick
		});

		this.#pointsModel!.addObserver(this.#handleModelEvent);
		this.#offersModel!.addObserver(this.#handleModelEvent);
		this.#destinationsModel!.addObserver(this.#handleModelEvent);
		this.#filterModel!.addObserver(this.#handleModelFilterChange);
	}

	get points() {
		this.#filterType = this.#filterModel!.filter;
		const points = this.#pointsModel!.points;
		const filteredPoints = FILTER_FUNCTIONS[this.#filterType](points);

		switch (this.#currentSortType) {
			case 'sort-price':
				return filteredPoints.sort(sortByPrice);
			case 'sort-time':
				return filteredPoints.sort(sortByDuration);
			case 'sort-day':
				return filteredPoints.sort(sortByDate);
		}
	}

	get allOffers(): Offer[] {
		const allOffers = this.#offersModel.offers;
		return allOffers;
	}

	#getDestinations(): Destination[] {
		const allDestinations = this.#destinationsModel.destinations;
		return allDestinations;
	}

	#getTotalPrice(points: Point[]) {
		let totalPrice = 0;
		for (const point of points) {
			totalPrice += point.cost;
		}
		return totalPrice;
	}

	#getTotalPriceOffers(points: Point[]) {
		let offersPrice = 0;
		for (const point of points) {
			offersPrice += this.#offersModel.getTotalPriceOffers(point.type, point.offers);
		}
		return offersPrice;
	}

	init() {
		this.#renderTrip();
		Promise.all([this.#offersModel.init(), this.#destinationsModel.init(), this.#pointsModel.init()]).then(() => {
			this.#pointsModel.notifySuccessLoad();
		});
	}

	#renderNewPointPresenter() {
		const newPointPresenter = new NewPointPresenter({
			pointContainer: this.#tripComponent.element,
			allOffers: this.#offersModel.offers,
			destination: this.#destinationsModel.destinations,
			onDataChange: this.#handleViewAction,
			onDestroy: this.#onNewPointDestroy
		});
		newPointPresenter.init();
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

	#handleModelEvent = (updateType: UpdateType, payload?: Point) => {
		switch (updateType) {
			case 'PATCH':
				this.#pointPresenters.get(payload!.id).init(payload);
				break;
			case 'MINOR':
				this.#handleModelEventChange();
				break;
			case 'MAJOR':
				this.#handleModelEventChange(true);
				break;
			case 'INIT':
				this.#isLoading = false;
				this.#handleModelEventChange(true);
				break;
		}
	};

	#handleModelFilterChange = (updateType: UpdateType) => {
		switch (updateType) {
			case 'MINOR':
				this.#handleModelEventChange();
				break;
			case 'MAJOR':
				this.#handleModelEventChange(true);
				break;
		}
	};

	#handleModelEventChange = (resetSortType = false) => {
		this.#clearTripList({ resetSortType });
		remove(this.#tripInfo!);
		remove(this.#sortComponent!);
		remove(this.#loadingComponent!);
		this.#newPointButton!.removeDisabledAttribute();
		this.#renderTripInfo();
		this.#renderTripList();
	};

	#handleModeChange = () => {
		this.#newPointPresenter?.destroy();
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

	#renderPoint(point: Point, allOffers: Offer[], allDestinations: Destination[]) {
		const pointPresenter = new PointPresenter({
			pointContainer: this.#tripComponent.element,
			onDataChange: this.#handleViewAction,
			onModeChange: this.#handleModeChange
		});
		pointPresenter.init(point, allOffers, allDestinations);
		this.#pointPresenters.set(point.id, pointPresenter);
	}

	#renderPoints(points: Point[], allOffers: Offer[], allDestinations: Destination[]) {
		points.forEach((point) => this.#renderPoint(point, allOffers, allDestinations));
	}

	#renderNewPoint() {
		this.#currentSortType = 'sort-day';
		this.#filterModel.setFilter('MAJOR', 'everything');
		this.#renderNewPointPresenter();
	}

	#renderNoPoints() {
		this.#noPointComponent = new TripEmptyView({
			filterType: this.#filterType,
		});

		remove(this.#loadingComponent);
		render(this.#noPointComponent, this.#tripComponent.element, 'afterbegin');
	}

	#renderLoading() {
		render(this.#loadingComponent, this.#tripComponent.element, 'afterbegin');
	}

	#clearTripList({ resetSortType = false } = {}) {
		this.#pointPresenters.forEach((presenter) => presenter.destroy());
		this.#pointPresenters.clear();

		if (resetSortType) {
			this.#currentSortType = 'sort-day';
		}

		if (this.#noPointComponent) {
			remove(this.#noPointComponent);
		}
	}

	#renderTripList() {
		render(this.#tripComponent, this.#tripContainer);

		this.#renderPoints(this.points, this.allOffers, this.#getDestinations());

		if (this.points.length === 0 && !this.#isLoading) {
			this.#renderNoPoints();
		}
	}

	#renderTripInfo() {
		this.#tripInfo = new TripInfoView(this.points, this.#getTotalPrice(this.points), this.#getTotalPriceOffers(this.points), this.#getDestinations());
		render(this.#tripInfo, this.#infoContainer, 'afterbegin');
		render(this.#newPointButton!, this.#infoContainer);

		this.#renderSort();
	}

	#renderTrip() {
		this.#renderTripInfo();
		this.#renderTripList();

		if (this.#isLoading) {
			this.#newPointButton!.setDisableAttribute();
			this.#renderLoading();
		}
	}
}
