import Observable from '../framework/observable';
import { FILTER_TYPES, FilterType } from '../const';

export default class FilterModel extends Observable {
	#filter: FilterType = FILTER_TYPES[0];

	get filter() {
		return this.#filter;
	}

	setFilter(typeEvent: string, currentFilter: FilterType) {
		this.#filter = currentFilter;
		this._notify(typeEvent, this.#filter);
	}
}
