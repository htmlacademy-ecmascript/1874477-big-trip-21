import AbstractView from '../framework/view/abstract-view';
import { NoPointsTextType } from '../const';
import { FilterType } from '../types-ts';

function createEmptyListMessage(filterType: FilterType) {
	const noPointTextValue = NoPointsTextType[filterType];
	return `<p class="trip-events__msg"> ${noPointTextValue}</p>`;
}

export default class TripEmptyView extends AbstractView<HTMLParagraphElement> {
	#filterType: FilterType | null = null;

	constructor({ filterType }: { filterType: FilterType | null}) {
		super();
		this.#filterType = filterType;
	}

	get template() {
		return createEmptyListMessage(this.#filterType!);
	}
}
