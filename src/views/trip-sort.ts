import AbstractView from '../framework/view/abstract-view';
import { SORT_TYPES } from '../const';

export type SortType = typeof SORT_TYPES[number];

function createSortTemplate() {
	return (
		`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
      <label class="trip-sort__btn" for="sort-day">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
      <label class="trip-sort__btn" for="sort-time">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`
	);
}

export default class TripTripSortView extends AbstractView<HTMLElement> {
	#onSortChange: (sort: SortType) => void;

	constructor({ onSortChange }: { onSortChange: (sort: SortType) => void }) {
		super();
		this.#onSortChange = onSortChange;

		this.element.addEventListener('change', this.#handleSortChange);
	}

	get template() {
		return createSortTemplate();
	}

	setCheckedInput(inputValue: SortType) {
		const inputElement = this.element.querySelector(`input[value="${inputValue}"]`) as HTMLInputElement;
		if (inputElement) {
			inputElement.checked = true;
		}
	}

	#handleSortChange = (evt: Event) => {
		const target = evt.target as HTMLInputElement;
		this.#onSortChange(target.value as SortType);
	};
}
