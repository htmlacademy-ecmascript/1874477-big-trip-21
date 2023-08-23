import FilterView from '../views/trip-filter';
import TripInfoView from '../views/trip-info';
// import TripEmptyView from '../views/trip-empty-list';
import SortView from '../views/trip-sort';
import PointPresenter from './point';
import EventListView from '../views/trip-list';
import PointsModel from '../model/trip';
import { FilterType } from '../views/trip-filter';
import { SortType } from '../views/trip-sort';
import { Point } from '../types-ts';
import { SORT_TYPES } from '../const';
import { render } from '../framework/render';
import dayjs from 'dayjs';

const headerTripElement = document.querySelector<HTMLDivElement>('.trip-main')!;
const headerFilterElement = document.querySelector<HTMLDivElement>('.trip-controls__filters')!;

export default class TripPresenter {
	#tripComponent = new EventListView();
	#tripContainer: HTMLDivElement;
	#pointsModel: PointsModel;
	#points: Point[] = [];
	#filteredPoints: Record<FilterType, Point[]>;
	#filteredData: Point[] = [];
	#sortedPoints: Record<SortType, Point[]>;
	#currentSort: SortType;
	#currentFilter: FilterType = 'everything';
	#sortView?: SortView;


	constructor({ tripContainer, pointsModel }: { tripContainer: HTMLDivElement; pointsModel: PointsModel }) {
		this.#tripContainer = tripContainer;
		this.#pointsModel = pointsModel;
		this.#points = [...this.#pointsModel.points];
		this.#currentSort = SORT_TYPES[2];

		const now = dayjs();

		this.#filteredPoints = {
			everything: this.#points,
			future: this.#points.filter((point) => dayjs(point.dateFrom).isAfter(now)),
			present: this.#points.filter((point) => dayjs(point.dateFrom).isSame(now) || dayjs(point.dateTo).isAfter(now)),
			past: this.#points.filter((point) => dayjs(point.dateTo).isBefore(now)),
		};

		this.#sortedPoints = {
			'sort-price': this.#points.slice().sort((a, b) => a.cost - b.cost),
			'sort-time': this.#points.slice().sort((a, b) => dayjs(a.dateTo).diff(dayjs(a.dateFrom)) - dayjs(b.dateTo).diff(dayjs(b.dateFrom))),
			'sort-day': this.#points.slice().sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom))),
		};
	}

	init() {
		this.#sortView = new SortView({onSortChange: this.#handleSortChange});

		render(this.#sortView, this.#tripContainer);
		render(new TripInfoView(this.#points), headerTripElement, 'afterbegin');
		render(new FilterView({
			onFilterChange: this.#handleFilterChange,
			disabledFilters: Object.keys(this.#filteredPoints).filter((filter) =>
				!this.#filteredPoints[filter as FilterType].length) as FilterType[],
		}), headerFilterElement);

		render(this.#tripComponent, this.#tripContainer);
		this.#renderPoints(this.#points);
	}

	#handleFilterChange = (filter: FilterType) => {
		this.#currentFilter = filter;
		this.#currentSort = SORT_TYPES[2];
		this.#sortView?.setCheckedInput(this.#currentSort);
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

	#renderPoints(points: Point[]) {
		this.#tripComponent.clearPointList();

		for (let i = 0; i < points.length; i++) {
			this.#renderPoint(points[i]);
		}
	}

	#renderPoint(point: Point) {
		const pointPresenter = new PointPresenter(this.#tripComponent.element);
		pointPresenter.renderPoint(point);
	}
}
