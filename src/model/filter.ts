import Observable from '../framework/observable';
import { FilterType, UpdateType } from '../types-ts';

export default class FilterModel extends Observable {
	#filter: FilterType = 'everything';

	get filter() {
		return this.#filter;
	}

	setFilter(typeEvent: UpdateType, currentFilter: FilterType) {
		this.#filter = currentFilter;
		this._notify(typeEvent, currentFilter);
	}
}
