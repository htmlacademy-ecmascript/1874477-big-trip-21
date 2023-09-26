import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';
import { getFormattedDateDiff } from '../util/common';
import { Point, OfferItem } from '../types-ts';
import he from 'he';

function createOffersTemplate(offers: OfferItem[]): string {
  if (!offers) {
    return '';
  }

  return offers
    .filter((offer) => offer)
    .map(
      (offer) => /*html*/`
      <li class="event__offer">
        <span class="event__offer-title">${he.encode(offer.title)}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${he.encode(String(offer.price))}</span>
      </li>`
    )
    .join('');
}

function createPointTemplate({ type, dateFrom, dateTo, offers, cost, isFavorite }: Point, offersForType: OfferItem[], destinationName: string): string {
  const filteredOffers = offersForType.filter((offer) => offers.some((id) => String(id) === offer.id));
  const offersTemplate = createOffersTemplate(filteredOffers);
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
          <img class="event__type-icon" width="42" height="42" src="img/icons/${he.encode(type.toLowerCase())}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${he.encode(type)} ${he.encode(destinationName)}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStart}">${dateStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateEnd}">${dateEnd}</time>
          </p>
          <p class="event__duration">${getFormattedDateDiff(startDate, endDate)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${he.encode(String(cost))}</span>
        </p>
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
  #point: Point | null = null;
  #offersForType: OfferItem[] | null = null;
  #destination: string;
  #handleEditClick: ((point: Point | null) => void) | null = null;
  #handleFavoriteClick: ((point: Point | null) => void) | null = null;

  constructor({ point, destination, offersForType, onEditClick, onFavoriteClick }: { point: Point, destination: string, offersForType: OfferItem[], onEditClick: ((point: Point | null) => void) | null, onFavoriteClick: ((point: Point | null) => void) | null }) {
    super();

    this.#point = point;
    this.#destination = destination;
    this.#offersForType = offersForType;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

		this.element.querySelector('.event__rollup-btn')!.addEventListener('click', this.#editClickHandler);
		this.element.querySelector('.event__favorite-btn')!.addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point!, this.#offersForType!, this.#destination);
  }

  #editClickHandler = (evt: Event) => {
    evt.preventDefault();
    this.#handleEditClick?.(this.#point);
  };

  #favoriteClickHandler = (evt: Event) => {
    evt.preventDefault();
    this.#handleFavoriteClick?.(this.#point);
  };

  removePoints() {
    this.element.remove();
  }
}
