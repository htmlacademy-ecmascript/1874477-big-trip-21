import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';
import { Point } from '../types-ts';
import { formattedCityNames } from '../utils/common';

function createTripInfoTemplate(points: Point[]) {
	const totalPoints = points.length;

	const cities = points.map((point) => point.destination.name);
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

	const totalCost = totalPoints > 0 ? points.reduce((total, point) => total + point.cost, 0) : '';
	const costHtml = totalCost !== '' ? `Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>` : '';

	return /*html*/`<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${tripTitle}</h1>
      <p class="trip-info__dates">${tripDates}</p>
    </div>

    <p class="trip-info__cost">
      ${costHtml}
    </p>
  </section>`;
}

export default class TripInfoView extends AbstractView<HTMLElement> {
	#points: Point[];

	constructor(points: Point[]) {
		super();
		this.#points = points;
	}

	get template() {
		return createTripInfoTemplate(this.#points);
	}
}
