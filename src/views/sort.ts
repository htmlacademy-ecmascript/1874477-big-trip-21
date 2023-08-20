import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';
import { SortType } from '../const';
import { Point } from '../types-ts';

function createSortTemplate() {
	return (
		`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">
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
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>
      <label class="trip-sort__btn" for="sort-price">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`
	);
}

export default class SortView extends AbstractView<HTMLElement> {
	#sortType: string;
	#points: Point[];
	#sortedPoints: Point[];
	#onSort: (sortedPoints: Point[]) => void;

	constructor(points: Point[], onSort: (sortedPoints: Point[]) => void) {
		super();
		this.#sortType = SortType[0];
		this.#onSort = onSort;
		this.#points = [...points];
		this.#sortedPoints = [...points];

		const sortInputs = this.element.querySelectorAll('.trip-sort__input');
		sortInputs.forEach((input) => {
			input.addEventListener('change', this.handleSortChange);
		});
	}

	get template() {
		return createSortTemplate();
	}

	handleSortChange = (evt: Event) => {
		const target = evt.target as HTMLInputElement;
		this.#sortType = target.value;
		this.sortPoints();
		this.#onSort(this.#sortedPoints);
	};

	sortPoints() {
		switch (this.#sortType) {
			case SortType[0]:
				this.#sortedPoints = this.#points.slice().sort((a, b) => a.cost - b.cost);
				break;
			case SortType[1]:
				this.#sortedPoints = this.#points.slice().sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));
				break;
			case SortType[2]:
				this.#sortedPoints = this.#points.slice().sort(
					(a, b) =>
						dayjs(a.dateTo).diff(dayjs(a.dateFrom)) - dayjs(b.dateTo).diff(dayjs(b.dateFrom))
				);
				break;
		}
	}
}
