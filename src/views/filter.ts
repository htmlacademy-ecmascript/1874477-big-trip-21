import AbstractView from '../framework/view/abstract-view';
import { Point } from '../types-ts';
import { FilterType } from '../const';
import dayjs from 'dayjs';

function createFilterTemplate() {
	return (
	/*html*/`<form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
          <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">
          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
          <label class="trip-filters__filter-label" for="filter-future">Future</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">
          <label class="trip-filters__filter-label" for="filter-present">Present</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>
          <label class="trip-filters__filter-label" for="filter-past">Past</label>
        </div>

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
	);
}
export default class FilterView extends AbstractView<HTMLElement> {
	#filterType: string;
	#points: Point[];
	#filteredPoints: Point[];
	#onFilter: (filteredPoints: Point[]) => void;

	constructor(points: Point[], onFilter: (filteredPoints: Point[]) => void) {
		super();
		this.#filterType = FilterType[0];
		this.#onFilter = onFilter;
		this.#points = [...points];
		this.#filteredPoints = [...points];

		const filterInputs = this.element.querySelectorAll('.trip-filters__filter-input');
		filterInputs.forEach((input) => {
			input.addEventListener('change', this.handleFilterChange);
		});
	}

	get template() {
		return createFilterTemplate();
	}

	handleFilterChange = (evt: Event) => {
		const target = evt.target as HTMLInputElement;
		this.#filterType = target.value;
		this.filterPoints();
		this.#onFilter(this.#filteredPoints);
	};


	filterPoints() {
		switch (this.#filterType) {
			case FilterType[0]:
				this.#filteredPoints = [...this.#points];
				break;
			case FilterType[1]:
				this.#filteredPoints = this.#points.filter((point) =>
					dayjs(point.dateFrom).isAfter(dayjs())
				);
				break;
			case FilterType[2]:
				this.#filteredPoints = this.#points.filter((point) =>
					dayjs(point.dateFrom).isSame(dayjs()) || dayjs(point.dateTo).isAfter(dayjs())
				);
				break;
			case FilterType[3]:
				this.#filteredPoints = this.#points.filter((point) =>
					dayjs(point.dateTo).isBefore(dayjs())
				);
				break;
		}
	}
}
