import AbstractView from '../framework/view/abstract-view';
import { getDestinations } from '../point-mock';
import { Point, Offer, Photo } from '../types-ts';
import dayjs from 'dayjs';

function createTypesTemplate() {
	return (
	/*html*/`<div class="event__type-item">
    <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
    <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
  </div>

  <div class="event__type-item">
    <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
    <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
  </div>

  <div class="event__type-item">
    <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
    <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
  </div>

  <div class="event__type-item">
    <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
    <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
  </div>

  <div class="event__type-item">
    <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
    <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
  </div>

  <div class="event__type-item">
    <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
    <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
  </div>

  <div class="event__type-item">
    <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
    <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
  </div>

  <div class="event__type-item">
    <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
    <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
  </div>

  <div class="event__type-item">
    <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
    <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
  </div>
       `
	);
}

function createOffersTemplate(offers: Offer[]) {
	return offers.map((offer) => {
		const offerName = offer.name;
		const lowerOfferName = offerName.toLowerCase();
		const offerChecked = offer.checked;

		return /*html*/`
      <div class="event__offer-selector">
      <input
      class="event__offer-checkbox visually-hidden"
      type="checkbox"
      id="${lowerOfferName}"
      name="${lowerOfferName}"
      ${offerChecked ? 'checked' : ''}
    >
        <label class="event__offer-label" for="${lowerOfferName}">
          <span class="event__offer-title">${offerName}</span>
          +
          €&nbsp;<span class="event__offer__price">${offer.cost}</span>
        </label>
      </div>
    `;
	}).join('');
}

function createDestinationsTemplate(destinations: Point['destination'][]) {
	return destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

function createPhotosTemplate(photos: Photo[]) {
	const photosArr = Array.isArray(photos) ? photos : [];

	if (photosArr.length === 0) {
		return '';
	}

	return /*html*/`
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photosArr.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.alt}">`).join('')}
      </div>
    </div>`;
}

function createEditPointTemplate({ type, destination, dateFrom, dateTo, offers, cost }: Point) {
	const eventTypeTemplate = createTypesTemplate();
	const offersTemplate = offers ? createOffersTemplate(offers) : '';
	const destinationsTemplate = createDestinationsTemplate(getDestinations());
	const photosTemplate = destination.photos ? createPhotosTemplate(destination.photos) : '';
	const dateStart = dateFrom ? dayjs(dateFrom).format('DD/MM/YY HH:mm') : '';
	const dateEnd = dateTo ? dayjs(dateTo).format('DD/MM/YY HH:mm') : '';

	return /*html*/`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${eventTypeTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination ? destination.name : ''}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationsTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        ${offersTemplate ? /*html*/`
        <section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              <div class="event__available-offers">
                ${offersTemplate}
              </div>
            </section>` : ''}

            ${destination && destination.description !== '' ? /*html*/`
            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${destination.description}</p>
              ${photosTemplate}
            </section>` : ''}
        </section>
      </form>
    </li>`;
}

export default class PointEditView extends AbstractView<HTMLElement> {
	#point: Point;
	#handleFormSubmit: (point: Point) => void;
	#handleButtonClick: (point: Point) => void;

	constructor({ point, onFormSubmit, onButtonClick }: { point: Point, onFormSubmit: (point: Point) => void, onButtonClick: (point: Point) => void }) {
		super();
		this.#point = point;
		this.#handleFormSubmit = onFormSubmit;
		this.#handleButtonClick = onButtonClick;

		this.element.querySelector('form')!
			.addEventListener('submit', this.#formSubmitHandler);
		this.element.querySelector('.event__rollup-btn')!
			.addEventListener('click', this.#formButtonClickHandler);

	}

	get template() {
		return createEditPointTemplate(this.#point);
	}

	#formSubmitHandler = (evt: Event) => {
		evt.preventDefault();
		this.#handleFormSubmit(this.#point);
	};

	#formButtonClickHandler = (evt: Event) => {
		evt.preventDefault();
		this.#handleButtonClick(this.#point);
	};
}
