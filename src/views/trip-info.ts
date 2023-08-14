import AbstractView from './_abstract';
import dayjs from 'dayjs';
import { DATE_FORMATS } from '../const';
import { formattedCityNames } from '../utils';

function createTripInfoTemplate(points: any[]) {
  const totalPoints = points.length;

  const cities = points.map(point => point.destination.name);
  const tripTitle = formattedCityNames(cities);

  let formattedStartDate = '';
  let formattedEndDate = '';

  if (totalPoints >= 1) {
    const startDate = points[0].dates.start;
    const endDate = points[totalPoints - 1].dates.end;
    formattedStartDate = dayjs(startDate).format(DATE_FORMATS.TRIP_INFO);
    formattedEndDate = dayjs(endDate).format(DATE_FORMATS.TRIP_INFO);
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
  private points: any[];

  constructor(points: any[]) {
    super();
    this.points = points;
  }

  get template() {
    return createTripInfoTemplate(this.points);
  }
}
