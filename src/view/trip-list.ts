import AbstractView from '../framework/view/abstract-view';

const TRIP_LIST_TEMPLATE: string = '<ul class="trip-events__list"></ul>';

export default class TripListView extends AbstractView<HTMLElement> {
	constructor() {
		super();
	}

	get template() {
		return TRIP_LIST_TEMPLATE;
	}

	clearPointList() {
		this.element.innerHTML = '';
	}
}
