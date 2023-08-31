import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter';
import PointsModel from './model/trip';
import FiltersModel from './model/filter';

export const headerTripElement = document.querySelector<HTMLDivElement>('.trip-main')!;
const tripContainer = document.querySelector<HTMLDivElement>('.trip-events')!;

const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();
const tripPresenter = new TripPresenter({ tripContainer: tripContainer, pointsModel, filterModel: filtersModel });
const filterPresenter = new FilterPresenter({ filterContainer: headerTripElement, pointsModel: pointsModel, filterModel: filtersModel });

tripPresenter.init();
filterPresenter.init();


