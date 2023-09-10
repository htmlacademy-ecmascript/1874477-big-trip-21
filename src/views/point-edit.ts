import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { getDestinations, NEW_BLANK_POINT } from '../point-mock';
import { Point, Offer, Photo, Destination, PointEditState } from '../types-ts';
import { AllOffers, POINT_TYPES } from '../const';
import dayjs from 'dayjs';
import he from 'he';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createTypesTemplate(selectedType: string) {
	let template = '';

	POINT_TYPES.forEach((type) => {
		const value = type.toLowerCase();
		const checked = value === selectedType.toLowerCase() ? 'checked' : '';
		template += /*html*/`
      <div class="event__type-item">
        <input id="event-type-${value}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${value}" ${checked}>
        <label class="event__type-label event__type-label--${value}" for="event-type-${value}">${type}</label>
      </div>
    `;
	});

	return template;
}

function createOffersTemplate(offers: Offer[]) {
	return offers.map((offer) => {
		const offerName = offer.name;
		const lowerOfferName = offerName.toLowerCase();
		const offerChecked = offer.checked;
		const offerId = offer.id;

		return /*html*/`
      <div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          type="checkbox"
          id="${offerId}"
          name="${lowerOfferName}"
          ${offerChecked ? 'checked' : ''}
        >
        <label class="event__offer-label" for="${offerId}">
          <span class="event__offer-title">${offerName}</span>
          +
          €&nbsp;<span class="event__offer__price">${offer.cost}</span>
        </label>
      </div>
    `;
	}).join('');
}

function createDestinationsTemplate(destinations: Destination[]) {
	return destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');
}

function createPhotosTemplate(photos: Photo[]) {
	if (!photos || photos.length === 0) {
		return '';
	}

	return /*html*/`
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photos
		.filter((photo) => photo.src && photo.alt)
		.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.alt}">`)
		.join('')}
      </div>
    </div>`;
}

function createEditPointTemplate({ type, dateFrom, dateTo, offers, cost, destination }: Point) {
	const eventTypeTemplate = createTypesTemplate(type);
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

            ${he.encode(destination && destination.description) !== '' ? /*html*/`
            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${destination.description}</p>
              ${photosTemplate}
            </section>` : ''}
        </section>
      </form>
    </li>`;
}

export default class PointEditView extends AbstractStatefulView<PointEditState, Element> {
	#handleFormSubmit: (point: Point) => void;
	#handleButtonClick: (point: Point) => void;
	#handleEditFormDelete: ((point: Point) => void) | null = null;

	#datepickrStartDate: flatpickr.Instance | null = null;
	#datepickrEndDate: flatpickr.Instance | null = null;

	constructor({ point = NEW_BLANK_POINT, onFormSubmit, onButtonClick, onDeleteClick }:
    { point: Point, onFormSubmit: (point: Point) => void, onButtonClick: (point: Point) => void, onDeleteClick: (point: Point) => void, }) {
		super();
		this.#handleFormSubmit = onFormSubmit;
		this.#handleButtonClick = onButtonClick;
		this.#handleEditFormDelete = onDeleteClick;

		this._setState({
			point,
			destination: getDestinations().find((destination) => destination.name === point.destination.name),
		});

		this._restoreHandlers();
	}

	get template() {
		return createEditPointTemplate(this._state.point);
	}

	removeElement() {
		super.removeElement();

		if(this.#datepickrStartDate) {
			this.#datepickrStartDate.destroy();
			this.#datepickrStartDate = null;
		}
		if(this.#datepickrEndDate) {
			this.#datepickrEndDate.destroy();
			this.#datepickrEndDate = null;
		}
	}

	reset(point: Point) {
		this.updateElement({
			...point,
		});
	}

	_restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')!.addEventListener('click', this.#formButtonClickHandler);
    this.element.querySelector('.event--edit')!.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn')!.addEventListener('click', this.#formDeleteHandler);
    this.element.querySelector('.event__type-group')!.addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination')!.addEventListener('change', this.#pointDestinationChangeHandler);
    this.element.querySelector('.event__input--price')!.addEventListener('change', this.#pointPriceChangeHandler);
    this.element.querySelector('.event__details')?.addEventListener('change', this.#pointOfferClickHandler);

    this.#setDatepickr();
	}

	#setDatepickr() {
		const dateFrom = new Date(this._state.point.dateFrom);
		const dateTo = new Date(this._state.point.dateTo);

		this.#datepickrStartDate = flatpickr(
			this.element.querySelector('#event-start-time-1')!,
			{
				enableTime: true,
				dateFormat: 'd/m/y H:i',
				defaultDate: dateFrom,
				'time_24hr': true,
				maxDate: dateTo,
				onClose: (dates) => {
					if (dates.length > 0) {
						this.#pointStartDateChangeHandler(dates[0]);
					}
				},
			},
		);

		this.#datepickrEndDate = flatpickr(
			this.element.querySelector('#event-end-time-1')!,
			{
				enableTime: true,
				dateFormat: 'd/m/y H:i',
				defaultDate: dateTo,
				'time_24hr': true,
				minDate: dateFrom,
				onClose: (selectedDates) => {
					if (selectedDates.length > 0) {
						this.#pointEndDateChangeHandler(selectedDates[0]);
					}
				},
			},
		);
	}

	#pointStartDateChangeHandler = (userDateAndTime: Date) => {
		this.updateElement({
			point: {
				...this._state.point,
				dateFrom: userDateAndTime.toISOString(),
			}
		});
	};

	#pointEndDateChangeHandler = (userDateAndTime: Date) => {
		this.updateElement({
			point: {
				...this._state.point,
				dateTo: userDateAndTime.toISOString(),
			}
		});
	};

	#formSubmitHandler = (evt: Event) => {
		evt.preventDefault();
		this.#handleFormSubmit(this._state.point);
	};

	#formButtonClickHandler = (evt: Event) => {
		evt.preventDefault();
		this.#handleButtonClick(this._state.point);
	};

	#formDeleteHandler = (evt: Event) => {
		evt.preventDefault();
		this.#handleEditFormDelete!(this._state.point);
	};

	#pointTypeChangeHandler = (evt: Event) => {
		evt.preventDefault();
		const target = evt.target as HTMLInputElement;
		const selectedType = target.value;
		const type = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);
		const typeOffers = AllOffers[type];

		this.updateElement({
			point: {
				...this._state.point,
				type: selectedType,
				offers: typeOffers,
			}
		});
	};

	#pointDestinationChangeHandler = (evt: Event) => {
		evt.preventDefault();
		const target = evt.target as HTMLInputElement;
		const destinationName = target.value;
		const destinations = getDestinations();

		const foundDestination = destinations.find((destination) => destination.name === destinationName);

		if (foundDestination) {
			this.updateElement({
				point: {
					...this._state.point,
					destination: foundDestination,
				}
			});
		}
	};

	#pointOfferClickHandler = (evt: Event) => {
		evt.preventDefault();
		const targetInput = evt.target as HTMLInputElement;
		const offerId = targetInput.id;
		const updatedOffers = this._state.point.offers.map((offer) => {
			if (offer.id === offerId) {
				return {
					...offer,
					checked: targetInput.checked,
				};
			} else {
				return offer;
			}
		});
		this.updateElement({
			...this._state,
			point: {
				...this._state.point,
				offers: updatedOffers,
			},
		});
	};

	#pointPriceChangeHandler = (evt: Event) => {
		evt.preventDefault();
		const target = evt.target as HTMLInputElement;

		this._setState({
			point: {
				...this._state.point,
				cost: parseInt(target.value, 10),
			},
		});
	};
}
