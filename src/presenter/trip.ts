import PointsModel from '../model/trip';
import PointPresenter from './point';
import EventListView from '../views/trip-list';
import TripFilterView from '../views/trip-filter';
import { FilterType } from '../views/trip-filter';
import TripInfoView from '../views/trip-info';
import TripSortView from '../views/trip-sort';
import { SortType } from '../views/trip-sort';
import { Point } from '../types-ts';
import { SORT_TYPES } from '../const';
import { updateItem } from '../utils/common';
import { render } from '../framework/render';
import dayjs from 'dayjs';

const headerTripElement = document.querySelector<HTMLDivElement>('.trip-main')!;
const headerFilterElement = document.querySelector<HTMLDivElement>('.trip-controls__filters')!;

export default class TripPresenter {
	#tripComponent = new EventListView();
	#tripContainer: HTMLDivElement;
	#pointsModel: PointsModel | null = null;
	#points: Point[] = [];
	#pointPresenters = new Map();
	#filteredPoints: Record<FilterType, Point[]>;
	#filteredData: Point[] = [];
	#sortedPoints: Record<SortType, Point[]>;
	#currentSort: SortType;
	#currentFilter: FilterType = 'everything';
	#TripSortView?: TripSortView;


	constructor({ tripContainer, pointsModel }: { tripContainer: HTMLDivElement; pointsModel: PointsModel | null }) {
		this.#tripContainer = tripContainer;
		this.#pointsModel = pointsModel;
		this.#points = [...this.#pointsModel!.points];
		this.#currentSort = SORT_TYPES[2];

		const now = dayjs();

		this.#filteredPoints = {
			everything: this.#points,
			future: this.#points.filter((point) => dayjs(point.dateFrom).isAfter(now)),
			present: this.#points.filter((point) => dayjs(point.dateFrom).isBefore(now) && dayjs(point.dateTo).isAfter(now)),
			past: this.#points.filter((point) => dayjs(point.dateTo).isBefore(now)),
		};

		this.#sortedPoints = {
			'sort-price': this.#points.slice().sort((a, b) => a.cost - b.cost),
			'sort-time': this.#points.slice().sort((a, b) => dayjs(a.dateTo).diff(dayjs(a.dateFrom)) - dayjs(b.dateTo).diff(dayjs(b.dateFrom))),
			'sort-day': this.#points.slice().sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom))),
		};
	}

	init() {
		this.#TripSortView = new TripSortView({ onSortChange: this.#handleSortChange });

		render(this.#TripSortView, this.#tripContainer);
		render(new TripInfoView(this.#points), headerTripElement, 'afterbegin');
		render(new TripFilterView({
			onFilterChange: this.#handleFilterChange,
			disabledFilters: Object.keys(this.#filteredPoints).filter((filter) =>
				!this.#filteredPoints[filter as FilterType].length) as FilterType[],
		}), headerFilterElement);

		this.#renderTripList();
		this.#renderPoints(this.#points);
	}

	#handleFilterChange = (filter: FilterType) => {
		this.#currentFilter = filter;
		this.#currentSort = SORT_TYPES[2];
		this.#TripSortView?.setCheckedInput(this.#currentSort);
		this.#filteredData = this.#sortedPoints[this.#currentSort].filter((point) =>
			this.#filteredPoints[filter].includes(point));
		this.#renderPoints(this.#filteredData);
	};

	#handleSortChange = (sort: SortType) => {
		this.#currentSort = sort;
		this.#filteredData = this.#sortedPoints[this.#currentSort].filter((point) =>
			this.#filteredPoints[this.#currentFilter].includes(point)
		);

		this.#renderPoints(this.#filteredData);
	};

	#handlePointChange = (updatedPoint: Point) => {
		this.#points = updateItem(this.#points, updatedPoint);
		this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
	};

	#handleModeChange = () => {
		this.#pointPresenters.forEach((presenter) => presenter.resetView());
	};

	#renderPoints(points: Point[]) {
		this.#tripComponent.clearPointList();

		for (let i = 0; i < points.length; i++) {
			this.#renderPoint(points[i]);
		}
	}

	#renderPoint(point: Point) {
		const pointPresenter = new PointPresenter({
			pointContainer: this.#tripComponent.element,
			onDataChange: this.#handlePointChange,
			onModeChange: this.#handleModeChange});
		pointPresenter.init(point);
		this.#pointPresenters.set(point.id, pointPresenter);
	}

	// на потом #renderNoPoints() {

	// }

	// #clearPointList() {
	// 	this.#pointPresenters.forEach((presenter) => presenter.destroy());
	// 	this.#pointPresenters.clear();
	// }

	#renderTripList() {
		render(this.#tripComponent, this.#tripContainer);
	}
}
