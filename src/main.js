import FilterView from './view/filter-view.js';
import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render, RenderPosition } from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');
const headerTripElement = siteHeaderElement.querySelector('.trip-main');
const headerFilterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripContainer = siteMainElement.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({ boardContainer: tripContainer });

render(new TripInfoView(), headerTripElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), headerFilterElement);

boardPresenter.init();
