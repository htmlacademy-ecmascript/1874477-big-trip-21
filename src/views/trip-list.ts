import AbstractView from '../framework/view/abstract-view';

const TripListTemplate: string = '<ul class="trip-events__list"></ul>';


export default class TripListView extends AbstractView<HTMLUListElement> {
	constructor() {
		super();
	}

	get template() {
		return TripListTemplate;
	}

	clearPointList() {
		this.element.innerHTML = '';
	}
}
