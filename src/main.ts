import FilterView from './views/filter';
import TripInfoView from './views/trip-info';
import BoardPresenter from './presenter/board-presenter';
import { render } from './render';
import { getFormattedDateDiff } from './utils';

const headerTripElement = document.querySelector('.trip-main');
const headerFilterElement = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events') as HTMLElement;

if (!headerTripElement || !headerFilterElement || !tripContainer) {
  throw new Error('Required element not found');
}

render(new TripInfoView(), headerTripElement, 'afterbegin');
render(new FilterView(), headerFilterElement);

const boardPresenter = new BoardPresenter({ boardContainer: tripContainer });
boardPresenter.init();

const date1 = new Date('2023-08-12T10:11:00');
const date2 = new Date('2023-08-15T11:35:50');
const formattedDiff = getFormattedDateDiff(date1, date2);
console.log(formattedDiff);
