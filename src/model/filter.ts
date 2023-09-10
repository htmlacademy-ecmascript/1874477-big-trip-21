import Observable from '../framework/observable';
import { FILTER_TYPES } from '../const';
import { FilterType, UpdateType } from '../types-ts';

export default class FilterModel extends Observable {
	#filter: FilterType = FILTER_TYPES[0];

	get filter() {
		return this.#filter;
	}

	setFilter(typeEvent: UpdateType, currentFilter: FilterType) {
		this.#filter = currentFilter;
		this._notify(typeEvent, this.#filter);
	}
}
