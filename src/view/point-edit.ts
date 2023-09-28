import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { Point, Destination, Offer, OfferItem, Picture } from '../types-ts';
import { POINT_TYPES, NEW_BLANK_POINT } from '../const';
import dayjs from 'dayjs';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface PointEditProps {
  point: Point,
  destinations: Destination[],
  allOffers: Offer[],
  onFormSubmit: (point: Point) => void,
  onButtonClick?: (point: Point) => void,
  onDeleteClick: (point: Point) => void,
  isDisabled: boolean;
  isSaving: boolean;
  isDeleting: boolean;
}

interface PointEditState {
  point: Point;
  destination: Destination[];
  offers: OfferItem[];
  isDisabled: boolean,
  isSaving: boolean,
  isDeleting: boolean,
}

function createTypesTemplate(selectedType: string, isDisabled: boolean) {
  let template = '';

  POINT_TYPES.forEach((type) => {
    const value = type.toLowerCase();
    const checked = value === selectedType.toLowerCase() ? 'checked' : '';
    template += /*html*/`
      <div class="event__type-item">
        <input id="event-type-${he.encode(value)}" class="event__type-input visually-hidden" type="radio" name="event-type" value="${value}" ${checked}  ${isDisabled ? 'disabled' : ''}>
        <label class="event__type-label event__type-label--${he.encode(value)}" for="event-type-${he.encode(value)}">${type}</label>
      </div>`;
  });

  return template;
}

function createOffersTemplate(offers: OfferItem[], checkedOffers: string[], isDisabled: boolean) {
  return offers
    .map((offer) => {
      const offerId = offer.id;
      const offerName = offer.title;
      const offerChecked = checkedOffers.includes(offerId);
      const offerPrice = offer.price;
      return /*html*/`
      <div class="event__offer-selector">
          <input class="event__offer-checkbox visually-hidden" type="checkbox" id="${he.encode(offerId)}"
              name="${he.encode(offerName)}" ${offerChecked ? 'checked' : '' } ${isDisabled ? 'disabled' : '' }>
          <label class="event__offer-label" for="${he.encode(offerId)}">
              <span class="event__offer-title">${he.encode(offerName)}</span>
              +
              &euro;&nbsp;<span class="event__offer__price">${he.encode(String(offerPrice))}</span>
          </label>
      </div>`;
    }).join('');
}

function createDestinationsTemplate(destinations: Destination[]) {
  return destinations.map((destination) => `<option value="${he.encode(destination.name)}"></option>`).join('');
}

function createPhotosTemplate(photos: Picture[]) {
  if (!photos || photos.length === 0) {
    return '';
  }

  return /*html*/`
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${photos.filter((photo) => photo.src && photo.description)
    .map((photo) => `<img class="event__photo" src="${he.encode(photo.src)}" alt="${he.encode(photo.description)}">`)
    .join('')}
      </div>
    </div>`;
}

function createEditPointTemplate(
  { point, isDisabled, isSaving, isDeleting }: PointEditState,
  isNewBlankPoint: boolean = false,
  offersForType: OfferItem[],
  destinations: Destination[]) {
  const { type, offers, destination, dateFrom, dateTo, cost } = point;
  const eventTypeTemplate = createTypesTemplate(type, isDisabled);
  const offersTemplate = createOffersTemplate(offersForType, offers, isDisabled);
  const destinationsTemplate = createDestinationsTemplate(destinations);
  const destinationId = typeof destination === 'string' ? destination : destination.id.toString();
  const foundIndex = destinations.findIndex((item) => item.id === destinationId);
  const photosTemplate = foundIndex !== -1 ? createPhotosTemplate(destinations[foundIndex]!.pictures!) : '';
  const destinationDescription = destinations[foundIndex]?.description;
  const destinationName = foundIndex !== -1 ? destinations[foundIndex]?.name ?? '' : '';
  const dateStart = dateFrom ? dayjs(dateFrom).format('DD/MM/YY HH:mm') : '';
  const dateEnd = dateTo ? dayjs(dateTo).format('DD/MM/YY HH:mm') : '';

  const cancelButtonText = 'Cancel';
  const deleteButtonText = isDeleting ? 'Deleting...' : 'Delete';
  const buttonTemplate = isNewBlankPoint ? '' : /*html*/`
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`;

  const buttonResetTemplate = isNewBlankPoint ? cancelButtonText : deleteButtonText;

  return /*html*/`
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${he.encode(type.toLowerCase())}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>

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
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destinationName)}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
            <datalist id="destination-list-1">
              ${destinationsTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}" ${isDisabled ? 'disabled' : ''}>
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" min="0" name="event-price" value="${he.encode(cost.toString())}" ${isDisabled ? 'disabled' : ''}>
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${buttonResetTemplate}</button>
          ${buttonTemplate}
        </header>
        ${offersTemplate ? /*html*/`
        <section class="event__details">
            <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>

              <div class="event__available-offers">
                ${offersTemplate}
              </div>
            </section>` : ''}

            ${destinationDescription ? /*html*/`
            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${destinationDescription}</p>
              ${photosTemplate}
            </section>` : ''}
        </section>
      </form>
    </li>`;
}

export default class PointEditView extends AbstractStatefulView<PointEditState, Element> {
  #newPoint: Point;
  #allOffers: Offer[];
  #destinations: Destination[];
  #destinationForPoint: Destination[];
  #offersForType: OfferItem[];
  isDisabled: boolean = false;
  isSaving: boolean = false;
  isDeleting: boolean = false;

  #handleFormSubmit: (point: Point, { isDisabled, isSaving }: { isDisabled: boolean, isSaving: boolean }) => void;
  #handleButtonClick?: (point: Point) => void;
  #handleEditFormDelete: ((point: Point, { isDisabled, isDeleting }: { isDisabled: boolean, isDeleting: boolean }) => void) | null = null;

  #datepickrStartDate: flatpickr.Instance | null = null;
  #datepickrEndDate: flatpickr.Instance | null = null;

  constructor({ point = NEW_BLANK_POINT, destinations, allOffers, onFormSubmit, onButtonClick, onDeleteClick, isDisabled, isSaving, isDeleting }: PointEditProps) {
    super();
    this.#newPoint = point;
    this.#allOffers = allOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleButtonClick = onButtonClick;
    this.#handleEditFormDelete = onDeleteClick;
    this.#offersForType = this.#getOffersByType(point.type);
    this.#destinations = destinations;
    this.#destinationForPoint = [this.#destinations.find((destination) => destination.id === point.destination)].filter(Boolean) as Destination[];

    this.isDisabled = isDisabled;
    this.isSaving = isSaving;
    this.isDeleting = isDeleting;

    this._setState({
      point,
      offers: this.#offersForType,
      destination: this.#destinationForPoint,
      isDisabled: this.isDisabled,
      isSaving: this.isSaving,
      isDeleting: this.isDeleting,
    });

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate({
      point: this._state.point,
      destination: this.#destinationForPoint,
      offers: this.#offersForType,
      isDisabled: this._state.isDisabled,
      isSaving: this._state.isSaving,
      isDeleting: this._state.isDeleting
    }, this.#newPoint === NEW_BLANK_POINT, this.#offersForType, this.#destinations);
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickrStartDate) {
      this.#datepickrStartDate.destroy();
      this.#datepickrStartDate = null;
    }
    if (this.#datepickrEndDate) {
      this.#datepickrEndDate.destroy();
      this.#datepickrEndDate = null;
    }
  }

  reset(point: Point) {
    this.updateElement({
      point,
      offers: this.#offersForType,
      destination: this.#destinationForPoint,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  }

  _restoreHandlers() {
    if (this.#newPoint !== NEW_BLANK_POINT) {
      this.element.querySelector('.event__rollup-btn')!.addEventListener('click', this.#formButtonClickHandler);
    }
    this.element.querySelector('.event--edit')!.addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn')!.addEventListener('click', this.#formDeleteHandler);
    this.element.querySelector('.event__type-group')!.addEventListener('change', this.#pointTypeChangeHandler);
    this.element.querySelector('.event__input--destination')!.addEventListener('change', this.#pointDestinationChangeHandler);
    this.element.querySelector('.event__input--price')!.addEventListener('change', this.#pointPriceChangeHandler);
    this.element.querySelector('.event__details')?.addEventListener('change', this.#pointOfferClickHandler);

    this.#setDatepickr();
  }

  #getOffersByType(type: string): OfferItem[] {
    const foundOffers = this.#allOffers.filter((offer) => offer.type === type);
    const offerItems: OfferItem[] = foundOffers.flatMap((offer) => offer.offers);
    return offerItems;
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
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDateAndTime.toISOString(),
      }
    });
  };

  #pointEndDateChangeHandler = (userDateAndTime: Date) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDateAndTime.toISOString(),
      }
    });
  };

  #formSubmitHandler = (evt: Event) => {
    evt.preventDefault();
    this.#handleFormSubmit(this._state.point, {
      isDisabled: true,
      isSaving: true,
    });
  };

  #formButtonClickHandler = (evt: Event) => {
    evt.preventDefault();
    this.#handleButtonClick!(this._state.point);
  };

  #formDeleteHandler = (evt: Event) => {
    evt.preventDefault();
    this.#handleEditFormDelete!(this._state.point, {
      isDisabled: true,
      isDeleting: true,
    });
  };

  #pointTypeChangeHandler = (evt: Event) => {
    evt.preventDefault();
    const target = evt.target as HTMLInputElement;
    const selectedType = target.value;
    const offers = [''];
    this.#offersForType = this.#getOffersByType(selectedType);

    this.updateElement({
      point: {
        ...this._state.point,
        type: selectedType,
        offers: offers
      },
      offers: this.#offersForType
    });
  };

  #pointDestinationChangeHandler = (evt: Event) => {
    evt.preventDefault();
    const target = evt.target as HTMLInputElement;
    const destinationName = target.value;
    const foundDestination = this.#destinations.find((destination) => destination.name === destinationName);

    if (foundDestination) {
      const { id } = foundDestination;
      this.updateElement({
        point: {
          ...this._state.point,
          destination: id.toString(),
        },
      });
    }
  };

  #pointOfferClickHandler = (evt: Event) => {
    evt.preventDefault();
    const targetInput = evt.target as HTMLInputElement;
    const offerId = targetInput.id;
    const existingOffers = this._state.point.offers.filter((id) => id !== '');

    const updatedOffers = existingOffers.includes(offerId)
      ? existingOffers.filter((id) => id !== offerId)
      : existingOffers.concat(offerId);

    this._setState({
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
