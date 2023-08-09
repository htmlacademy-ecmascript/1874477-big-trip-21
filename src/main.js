import FilterView from './view/filters.js';
import TripInfoView from './view/trip-info.js';
import EventPresenter from './presenter/event-presenter.js';
import { render, RenderPosition } from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const headerTripElement = siteHeaderElement.querySelector('.trip-main');
const headerFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripContainer = siteMainElement.querySelector('.trip-events');
const eventPresenter = new EventPresenter({ eventContainer: tripContainer });

render(new TripInfoView(), headerTripElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), headerFilterElement);

eventPresenter.init();
