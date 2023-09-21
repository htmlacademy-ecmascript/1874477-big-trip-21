import PointsModel from '../model/points';
import FilterModel from '../model/filter';
import OffersModel from '../model/offers';
import DestinationsModel from '../model/destinations';
import PointPresenter from './point';
import NewPointPresenter from './new-point';
import TripListView from '../view/trip-list';
import TripEmptyView from '../view/trip-empty-list';
import NewPointButtonView from '../view/new-point-button';
import TripInfoView from '../view/trip-info';
import TripSortView from '../view/trip-sort';
import ServerMessageView from '../view/server-message';
import { Point, UpdateType, UserAction, FilterType, SortType, Offer, Destination } from '../types-ts';
import { ServerMessage, TimeLimit } from '../const';
import { sortByPrice, sortByDuration, sortByDate } from '../util/sort';
import { FILTER_FUNCTIONS } from '../util/filter';
import { render, remove } from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

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
	#serverMessageComponent: ServerMessageView | null = null;
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
	#uiBlocker = new UiBlocker({
		lowerLimit: TimeLimit.LOWER_LIMIT,
		upperLimit: TimeLimit.UPPER_LIMIT
	});

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
	}

	#renderNewPointPresenter() {
		this.#newPointPresenter = new NewPointPresenter({
			pointContainer: this.#tripComponent.element,
			allOffers: this.#offersModel.offers,
			destination: this.#destinationsModel.destinations,
			onDataChange: this.#handleViewAction,
			onDestroy: this.#onNewPointDestroy
		});
		this.#newPointPresenter.init();
	}

	#handleNewPointButtonClick = () => {
		this.#renderNewPoint();
		remove(this.#noPointComponent!);
		this.#newPointButton!.toggleNewPointButton(true);
	};

	#onNewPointDestroy = () => {
		if (this.points.length === 0 && !this.#isLoading) {
			this.#renderNoPoints();
		}

		this.#newPointButton!.toggleNewPointButton(false);
	};

	#handleViewAction = async (actionType: UserAction, updateType: UpdateType, update: Point) => {
		this.#uiBlocker.block();

		switch (actionType) {
			case 'UPDATE_POINT':
				this.#pointPresenters.get(update.id).setSaving();
				try {
					await this.#pointsModel.updatePoint(updateType, update);
				} catch (err) {
					this.#pointPresenters.get(update.id).setAborting();
				}
				break;
			case 'ADD_POINT':
				this.#newPointPresenter!.setSaving();
				try {
					await this.#pointsModel.addPoint(updateType, update);
				} catch (err) {
					this.#newPointPresenter!.setAborting();
				}
				break;
			case 'DELETE_POINT':
				this.#pointPresenters.get(update.id).setDeleting();
				try {
					await this.#pointsModel.deletePoint(updateType, update);
				} catch (err) {
					this.#pointPresenters.get(update.id).setAborting();
				}
				break;
		}

		this.#uiBlocker.unblock();
	};

	#handleModelEvent = (updateType: UpdateType, payload?: Point) => {
		switch (updateType) {
			case 'PATCH':
				this.#pointPresenters.get(payload!.id).init(payload);
				break;
			case 'MINOR':
				this.#handleModelEventChange(true);
				break;
			case 'MAJOR':
				this.#newPointPresenter!.destroy();
				this.#handleModelEventChange(true);
				break;
			case 'INIT':
				this.#isLoading = false;
				if (this.points.length === 0) {
					this.#renderNoPoints();
				}
				this.#handleModelEventChange(true);
				break;
			case 'INIT_FAIL':
				this.#isLoading = false;
				remove(this.#noPointComponent!);
				remove(this.#serverMessageComponent!);
				this.#newPointButton!.toggleNewPointButton(true);
				this.#renderLoading(ServerMessage.ERROR);
		}
	};

	#handleModelFilterChange = (updateType: UpdateType) => {
		switch (updateType) {
			case 'MINOR':
				this.#handleModelEventChange(true);
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
		remove(this.#serverMessageComponent!);
		remove(this.#noPointComponent!);
		this.#newPointButton!.toggleNewPointButton(false);
		this.#renderTripInfo();
		this.#renderTripList();
	};

	#handleModeChange = () => {
		this.#newPointPresenter?.destroy();
		this.#resetPointPresenter();
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

		render(this.#noPointComponent, this.#tripComponent.element, 'afterbegin');
	}

	#renderLoading(message: string) {
		this.#serverMessageComponent = new ServerMessageView(message);
		render(this.#serverMessageComponent, this.#tripComponent.element, 'afterbegin');
	}

	#resetPointPresenter() {
		this.#pointPresenters.forEach((presenter) => presenter.resetView());
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

		if (this.#newPointPresenter !== null) {
			remove(this.#noPointComponent!);
		}

		if (this.points.length === 0 && !this.#isLoading) {
			this.#renderNoPoints();
		}
	}

	#renderTripInfo() {
		const points = this.#pointsModel!.points.sort(sortByDate);
		this.#tripInfo = new TripInfoView(points, this.#getTotalPrice(points), this.#getTotalPriceOffers(points), this.#getDestinations());
		if (points.length > 0) {
			render(this.#tripInfo, this.#infoContainer, 'afterbegin');
		}
		render(this.#newPointButton!, this.#infoContainer);

		this.#renderSort();
	}

	#renderTrip() {
		this.#renderTripInfo();
		this.#renderTripList();

		if (this.#isLoading) {
			this.#newPointButton!.toggleNewPointButton(true);
			this.#renderLoading(ServerMessage.LOADING);
		}
	}
}
