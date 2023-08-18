import TripPresenter from './presenter/trip';
import PointsModel from './model/trip';

const tripContainer = document.querySelector('.trip-events') as HTMLElement;

const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter({ tripContainer: tripContainer, pointsModel });
tripPresenter.init();

