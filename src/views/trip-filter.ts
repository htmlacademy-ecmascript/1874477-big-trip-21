import AbstractView from '../framework/view/abstract-view';
import { FILTER_TYPES } from '../const';
import { capitalizeFirstLetter } from '../utils/utils';

export type FilterType = typeof FILTER_TYPES[number];

const createFilterItemTemplate = (filter: FilterType, checked = false, disabled = false) =>
	/*html*/`<div class="trip-filters__filter">
	<input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio"
  name="trip-filter" value="${filter}" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}>
	<label class="trip-filters__filter-label" for="filter-${filter}">${capitalizeFirstLetter(filter)}</label>
</div>`;

function createFilterTemplate(disabled: FilterType[]) {
	return (
	/*html*/`<form class="trip-filters" action="#" method="get">
  ${FILTER_TYPES.map((filter) => createFilterItemTemplate(filter, filter === 'everything', disabled.includes(filter))).join('')}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
	);
}
export default class FilterView extends AbstractView<HTMLElement> {
	#disabledFilters: FilterType[];
	#onFilterChange: (filter: FilterType) => void;

	constructor({ onFilterChange, disabledFilters }: { onFilterChange: (filter: FilterType) => void, disabledFilters?: FilterType[] }) {
		super();
		this.#onFilterChange = onFilterChange;
		this.#disabledFilters = disabledFilters || [];

		this.element.addEventListener('change', this.#handleFilterChange);
	}

	get template() {
		return createFilterTemplate(this.#disabledFilters);
	}

	#handleFilterChange = (evt: Event) => {
		const target = evt.target as HTMLInputElement;
		this.#onFilterChange(target.value as FilterType);
	};
}
