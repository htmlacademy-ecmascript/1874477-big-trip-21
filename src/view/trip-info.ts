import AbstractView from '../framework/view/abstract-view';
import { Destination, Point } from '../types-ts';
import { formattedCityNames } from '../util/common';
import dayjs from 'dayjs';
import he from 'he';

function createTripInfoTemplate(points: Point[], totalCost: number, offersPrice: number, destination: Destination[]) {
	const totalPoints = points.length;
	const totalPrice = totalCost + offersPrice;
	const cities = points.map((point) => {
		const pointDestinationId = point.destination;
		const allDestinations = destination.find((item) => item.id === pointDestinationId);
		let destinationName = '';

		destinationName = allDestinations !== undefined ? allDestinations.name.toString() : '';

		return destinationName;
	});

	const tripTitle = formattedCityNames(cities);

	let formattedStartDate = '';
	let formattedEndDate = '';

	if (totalPoints >= 1) {
		const startDate = points[0].dateFrom;
		const endDate = points[totalPoints - 1].dateTo;
		formattedStartDate = dayjs(startDate).format('D MMM');
		formattedEndDate = dayjs(endDate).format('D MMM');
	}

	const tripDates = formattedStartDate && formattedEndDate ? `${formattedStartDate} — ${formattedEndDate}` : '';

	const costHtml = (totalPrice === 0) ? '' : `Total: &euro;&nbsp;<span class="trip-info__cost-value">${he.encode(String(totalPrice))}</span>`;

	return /*html*/`<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${he.encode(tripTitle!)}</h1>
      <p class="trip-info__dates">${tripDates}</p>
    </div>

    <p class="trip-info__cost">
      ${costHtml}
    </p>
  </section>`;
}

export default class TripInfoView extends AbstractView<HTMLElement> {
	#points: Point[];
	#totalCost: number;
	#offersPrice: number;
	#destination: Destination[];

	constructor(points: Point[], totalCost: number, offersPrice: number, destination: Destination[]) {
		super();
		this.#points = points;
		this.#totalCost = totalCost;
		this.#destination = destination;
		this.#offersPrice = offersPrice;
	}

	get template() {
		return createTripInfoTemplate(this.#points, this.#totalCost, this.#offersPrice, this.#destination);
	}
}
