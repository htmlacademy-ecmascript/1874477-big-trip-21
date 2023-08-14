import AbstractView from './_abstract';

const TripListTemplate: string = '<ul class="trip-events__list"></ul>';


export default class TripListView extends AbstractView<HTMLDivElement> {
	constructor() {
		super();
	}

	get template() {
		return TripListTemplate;
	}
}
