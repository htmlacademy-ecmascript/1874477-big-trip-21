import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';
import { getFormattedDateDiff } from '../utils/common';
import { Point, Offer } from '../types-ts';

function createOffersTemplate(offers: Offer[]): string {
	if (!offers) {
		return '';
	}

	return offers
		.filter((offer) => offer.checked)
		.map(
			(offer) => /*html*/`
      <li class="event__offer">
        <span class="event__offer-title">${offer.name}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.cost}</span>
      </li>`
		)
		.join('');
}

function createPointTemplate({ type, destination, dateFrom, dateTo, offers, cost, isFavorite }: Point): string {
	const offersTemplate = createOffersTemplate(offers);
	const startDate = new Date(dateFrom);
	const endDate = new Date(dateTo);
	const dateForPoint = dayjs(startDate).format('MMM DD');
	const dateStart = dayjs(startDate).format('HH:mm');
	const dateEnd = dayjs(endDate).format('HH:mm');

	return /*html*/`
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateForPoint}">${dateForPoint}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination ? destination.name : ''}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStart}">${dateStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateEnd}">${dateEnd}</time>
          </p>
          <p class="event__duration">${getFormattedDateDiff(startDate, endDate)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${cost}</span>
        </p>
        <!-- Если у точки есть доп. услуги - выводим их -->
        ${offersTemplate ? `
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${offersTemplate}
          </ul>` : ''}
        <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
}

export default class PointView extends AbstractView<HTMLElement> {
	#point: Point;
	#handleEditClick: () => void;
	#handleFavoriteClick: () => void;

	constructor({ point, onEditClick, onFavoriteClick }: { point: Point, onEditClick: () => void, onFavoriteClick: () => void }) {
		super();

		this.#point = point;
		this.#handleEditClick = onEditClick;
		this.#handleFavoriteClick = onFavoriteClick;

		this.element.querySelector('.event__rollup-btn')!.addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn')!.addEventListener('click', this.#favoriteClickHandler);
	}

	get template() {
		return createPointTemplate(this.#point);
	}

	#editClickHandler = (evt: Event) => {
		evt.preventDefault();
		this.#handleEditClick();
	};

	#favoriteClickHandler = (evt: Event) => {
		evt.preventDefault();
		this.#handleFavoriteClick();
	};
}

